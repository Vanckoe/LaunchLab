'use client';

import { useEffect, useState } from 'react';
import { PageSpeedApiResponse } from '@/lib/utils/types';

interface PageSpeedCardProps {
  url: string;
  initialStrategy?: 'mobile' | 'desktop';
}

type ReportState = {
  loading: boolean;
  error: string;
  data: PageSpeedApiResponse | null;
};

type SummaryState = {
  loading: boolean;
  error: string;
  text: string | null;
};

export default function PageSpeedCard({ url, initialStrategy = 'mobile' }: PageSpeedCardProps) {
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>(initialStrategy);

  // cache for PageSpeed results
  const [reports, setReports] = useState<{
    mobile: ReportState;
    desktop: ReportState;
  }>({
    mobile: { loading: false, error: '', data: null },
    desktop: { loading: false, error: '', data: null },
  });

  // cache for summaries
  const [summaries, setSummaries] = useState<{
    mobile: SummaryState;
    desktop: SummaryState;
  }>({
    mobile: { loading: false, error: '', text: null },
    desktop: { loading: false, error: '', text: null },
  });

  // reset caches on URL change
  useEffect(() => {
    setReports({
      mobile: { loading: false, error: '', data: null },
      desktop: { loading: false, error: '', data: null },
    });
    setSummaries({
      mobile: { loading: false, error: '', text: null },
      desktop: { loading: false, error: '', text: null },
    });
  }, [url]);

  // fetch PageSpeed data per strategy
  useEffect(() => {
    const rep = reports[strategy];
    if (!url || rep.loading || rep.data) return;

    setReports(prev => ({
      ...prev,
      [strategy]: { loading: true, error: '', data: null },
    }));

    (async () => {
      try {
        const res = await fetch(
          `/api/pagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Ошибка загрузки');
        setReports(prev => ({
          ...prev,
          [strategy]: { loading: false, error: '', data: json },
        }));
      } catch (e: any) {
        setReports(prev => ({
          ...prev,
          [strategy]: { loading: false, error: e.message, data: null },
        }));
      }
    })();
  }, [url, strategy, reports]);

  const { loading, error, data } = reports[strategy];

  // fetch summary per strategy when data ready
  useEffect(() => {
    const sum = summaries[strategy];
    if (!data || sum.loading || sum.text !== null) return;

    setSummaries(prev => ({
      ...prev,
      [strategy]: { loading: true, error: '', text: null },
    }));

    (async () => {
      try {
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });
        const json = await res.json();
        setSummaries(prev => ({
          ...prev,
          [strategy]: { loading: false, error: '', text: json.summary },
        }));
      } catch {
        setSummaries(prev => ({
          ...prev,
          [strategy]: { loading: false, error: 'Ошибка загрузки итогов', text: null },
        }));
      }
    })();
  }, [data, strategy, summaries]);

  const summaryState = summaries[strategy];

  if (loading) return <Skeleton />;
  if (error) return <ErrorBox msg={error} />;
  if (!data) return null;

  return (
    <div className="p-6 w-full bg-white space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Header url={url} strategy={strategy} />
        <StrategySwitch strategy={strategy} setStrategy={setStrategy} />
      </div>

      <div className="flex flex-col items-center">
        <CategoryGauges scores={data.scores} large />
        <div className="mt-4 grid grid-cols-6 gap-4 text-center w-full">
          {(['fcp', 'lcp', 'cls', 'tbt', 'tti', 'si'] as const).map(k => (
            <div key={k} className="flex flex-col items-center">
              <span className="uppercase text-gray-500 text-xs">{k}</span>
              <span className="font-semibold text-gray-900 text-lg">
                {data.metrics[k].displayValue}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HeavyResources resources={data.network} />
        <OpportunitiesAndDiagnostics
          opportunities={data.opportunities}
          diagnostics={data.diagnostics}
        />
      </div>

      <div>
        {summaryState.loading && <SummarySkeleton text="Загрузка итогов аудита..." />}
        {summaryState.error && <ErrorBox msg={summaryState.error} />}
        {summaryState.text && (
          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-gray-900">
            <b>ИИ-итоги аудита:</b> {summaryState.text}
          </div>
        )}
      </div>
    </div>
  );
}

// Header component
function Header({ url, strategy }: { url: string; strategy: 'mobile' | 'desktop' }) {
  return (
    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
      <span className="px-2 py-0.5 rounded bg-[#0D87EF] text-white text-xs font-bold">
        ИИ-анализ
      </span>{' '}
      PageSpeed ({strategy === 'mobile' ? 'мобильный' : 'десктоп'}) →{' '}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600 break-all"
      >
        {url}
      </a>
    </h2>
  );
}

// Strategy switch buttons
function StrategySwitch({
  strategy,
  setStrategy,
}: {
  strategy: 'mobile' | 'desktop';
  setStrategy: (v: 'mobile' | 'desktop') => void;
}) {
  return (
    <div className="inline-flex rounded border border-gray-200 overflow-hidden">
      {(['mobile', 'desktop'] as const).map(opt => (
        <button
          key={opt}
          onClick={() => setStrategy(opt)}
          className={`px-3 py-1 text-sm font-medium transition ${
            strategy === opt ? 'bg-[#0D87EF] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {opt === 'mobile' ? '📱' : '🖥'}
        </button>
      ))}
    </div>
  );
}

// Category gauges with size control
function CategoryGauges({
  scores,
  large,
}: {
  scores: PageSpeedApiResponse['scores'];
  large?: boolean;
}) {
  const entries = Object.entries(scores).filter(([, v]) => v !== null) as [
    keyof typeof scores,
    number
  ][];
  const ringColor = (v: number) => (v >= 90 ? '#22c55e' : v >= 50 ? '#facc15' : '#ef4444');
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {entries.map(([key, val]) => (
        <div key={key} className="flex flex-col items-center">
          <div
            className={`${large ? 'w-48 h-48' : 'w-32 h-32'} relative rounded-full`}
            style={{
              background: `conic-gradient(${ringColor(val)} ${val * 3.6}deg, #f3f3f3 ${
                val * 3.6
              }deg)`,
            }}
          >
            <div
              className={`${
                large ? 'inset-6' : 'inset-2'
              } absolute bg-white rounded-full flex items-center justify-center `}
            >
              <span className={`${large ? 'text-5xl' : 'text-lg'} font-bold ${color(val)}`}>
                {val}
              </span>
            </div>
          </div>
          <span className="mt-5 text-xs text-gray-600 uppercase ">{key}</span>
        </div>
      ))}
    </div>
  );
}

// Opportunities and diagnostics
function OpportunitiesAndDiagnostics({
  opportunities,
  diagnostics,
}: {
  opportunities: PageSpeedApiResponse['opportunities'];
  diagnostics: PageSpeedApiResponse['diagnostics'];
}) {
  const hasOpp = opportunities.length > 0;
  const hasDiag = Object.keys(diagnostics).length > 0;
  if (!hasOpp && !hasDiag) return null;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-4">
      {hasOpp && (
        <div>
          <h3 className="font-semibold text-gray-900 border-b border-gray-200">
            Рекомендации по оптимизации
          </h3>
          <ul className="mt-1 text-sm space-y-1">
            {opportunities.map(o => (
              <li key={o.id} className="flex justify-between">
                <span className="text-gray-900">{o.title}</span>
                <span className="text-gray-500">−{o.savingsMs}ms</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasDiag && (
        <div>
          <h3 className="font-semibold text-gray-900 border-b border-gray-200">Диагностика</h3>
          <ul className="mt-1 text-sm space-y-1 text-gray-900 ">
            {'numRequests' in diagnostics && <li>Запросов: {diagnostics.numRequests}</li>}
            {'totalByteWeight' in diagnostics && (
              <li>Вес страницы: {(diagnostics.totalByteWeight / 1024).toFixed(1)}KB</li>
            )}
            {'domSize' in diagnostics && <li>DOM-элементов: {diagnostics.domSize}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

// Heavy resources
function HeavyResources({ resources }: { resources: PageSpeedApiResponse['network'] }) {
  if (!resources.length) return null;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-4">
      <h3 className="font-semibold text-gray-900 mb-2">Тяжёлые ресурсы (Top 10)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-200">
              <th className="py-1 pr-2 ">URL</th>
              <th className="py-1 pr-2 ">Тип</th>
              <th className="py-1 text-right">KB</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(r => (
              <tr key={r.url} className="border-b border-gray-100 text-gray-500">
                <td className="py-1 pr-2 truncate max-w-xs ">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 "
                  >
                    {r.url}
                  </a>
                </td>
                <td className="py-1 pr-2">{r.type}</td>
                <td className="py-1 text-right">{r.sizeKb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Skeleton loader
function Skeleton() {
  return (
    <div className="p-6 w-full animate-pulse text-left">
      <span className="text-gray-600 text-sm">Загрузка данных...</span>
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4 mt-4" />
      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-6" />
      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
    </div>
  );
}

// Error box
function ErrorBox({ msg }: { msg: string }) {
  return <div className="p-4 bg-red-50 border border-red-300 rounded text-red-700">{msg}</div>;
}

// Summary loader
function SummarySkeleton({ text }: { text?: string }) {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded text-gray-900 text-center">
      <span className="animate-pulse text-sm text-gray-600">{text || 'Загрузка...'}</span>
    </div>
  );
}

// Helper: color based on score
function color(v: number) {
  return v >= 90 ? 'text-green-500' : v >= 50 ? 'text-yellow-500' : 'text-red-500';
}
