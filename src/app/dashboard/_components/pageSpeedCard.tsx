'use client';

import { useEffect, useState } from 'react';
import { PageSpeedApiResponse } from '@/lib/utils/types';

interface PageSpeedCardProps {
  url: string;
  /** Исходная стратегия, если нужна (по умолчанию mobile) */
  initialStrategy?: 'mobile' | 'desktop';
}

export default function PageSpeedCard({ url, initialStrategy = 'mobile' }: PageSpeedCardProps) {
  /* ─────────── state ─────────── */
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>(initialStrategy);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PageSpeedApiResponse | null>(null);
  const [error, setError] = useState('');

  /* ───────── fetch on change ───────── */
  useEffect(() => {
    if (!url) return;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `/api/pagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`
        );
        const json = await res.json();
        res.ok ? setData(json) : setError(json.error || 'Ошибка API');
      } catch {
        setError('Нет соединения с API');
      }
      setLoading(false);
    })();
  }, [url, strategy]);

  /* ───────── helpers ───────── */
  const color = (v: number) =>
    v >= 90 ? 'text-green-500' : v >= 50 ? 'text-yellow-500' : 'text-red-500';

  /* ───────── UI ───────── */
  if (loading) return <Skeleton />;
  if (error) return <ErrorBox msg={error} />;
  if (!data) return null;

  return (
    <div className="rounded-lg p-6 shadow-md w-full space-y-6">
      {/* ───── Переключатель стратегии ───── */}
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between mb-4">
        <Header url={url} strategy={strategy} />

        <div className="inline-flexrounded ">
          {(['mobile', 'desktop'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setStrategy(opt)}
              className={`px-3 py-2 text-sm  border border-gray-200 font-mediumm ${
                strategy === opt ? 'bg-[#0D87EF] text-white' : 'bg-white text-gray-700 '
              } first:rounded-l last:rounded-r `}
            >
              {opt === 'mobile' ? '📱 Моб.' : '🖥 ПК'}
            </button>
          ))}
        </div>
      </div>

      {/* Performance + Web Vitals */}
      <PerfBlock scores={data.scores} metrics={data.metrics} />

      {/* Opportunities • Diagnostics */}
      <div className="flex flex-col md:flex-row w-full gap-10 md:gap-20">
        <OpportunitiesList list={data.opportunities} />
        <Diagnostics diag={data.diagnostics} />
      </div>

      {/* Heavy resources */}
      <HeavyResources resources={data.network} />
    </div>
  );
}

/* ───────────────────────── sub-components ────────────────────────── */

function Header({ url, strategy }: { url: string; strategy: string }) {
  return (
    <h2 className="text-xl font-semibold">
      PageSpeed ({strategy}) →{' '}
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

function PerfBlock({
  scores, // ← вместо perf передаём сразу все баллы
  metrics,
}: {
  scores: PageSpeedApiResponse['scores'];
  metrics: PageSpeedApiResponse['metrics'];
}) {
  const perf = scores.performance; // тот же общий балл
  const vitalsOrder: (keyof typeof metrics)[] = ['fcp', 'lcp', 'cls', 'tbt', 'tti', 'si'];

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-center border-b md:border-none border-gray-200 pb-10 md:gap-14">
      {/* ——— общий балл ——— */}
      <div className="flex flex-col items-center">
        {/* мини-круги категорий */}
        <CategoryGauges scores={scores} />
      </div>

      {/* ——— Core Web Vitals ——— */}
      <ul className="text-base md:text-xl space-y-1 w-full md:w-fit">
        {vitalsOrder.map(k => (
          <li key={k} className="flex flex-row w-full md:w-fit justify-between gap-1">
            <span className="capitalize font-semibold">
              {k} (
              {
                {
                  fcp: 'Первое отображение контента',
                  lcp: 'Отображение самого большого элемента',
                  cls: 'Суммарное смещение макета',
                  tbt: 'Общее время блокировки',
                  tti: 'Время до интерактивности',
                  si: 'Индекс скорости',
                }[k]
              }
              )
            </span>
            <span>{metrics[k].displayValue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OpportunitiesList({ list }: { list: PageSpeedApiResponse['opportunities'] }) {
  if (!list.length) return null;
  return (
    <div className="border-b md:border-none border-gray-200 pb-10 ">
      <h3 className="font-semibold mb-2 text-lg">Рекомендации по оптимизации</h3>
      <ul className="space-y-1 text-sm">
        {list.map(o => (
          <li key={o.id} className="flex justify-between gap-2">
            <span>{o.title}</span>
            <span className="text-gray-500">−{o.savingsMs} ms</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Diagnostics({ diag }: { diag: PageSpeedApiResponse['diagnostics'] }) {
  if (!Object.keys(diag).length) return null;
  return (
    <div className="border-b md:border-none border-gray-200 pb-10 ">
      <h3 className="font-semibold mb-2 text-lg">Диагностика</h3>
      <ul className="text-sm space-y-1">
        {'numRequests' in diag && (
          <li>
            <strong>Запросов:</strong> {diag.numRequests}
          </li>
        )}
        {'totalByteWeight' in diag && (
          <li>
            <strong>Вес страницы:</strong> {(diag.totalByteWeight / 1024).toFixed(1)} KB
          </li>
        )}
        {'domSize' in diag && (
          <li>
            <strong>DOM-элементов:</strong> {diag.domSize}
          </li>
        )}
      </ul>
    </div>
  );
}

function HeavyResources({ resources }: { resources: PageSpeedApiResponse['network'] }) {
  if (!resources.length) return null;
  return (
    <div>
      <h3 className="font-semibold mb-2 text-lg">Тяжёлые ресурсы (Top 10)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-200">
              <th className="text-left py-1 pr-4">URL</th>
              <th className="text-left py-1 pr-2">Тип</th>
              <th className="text-right py-1">KB</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(r => (
              <tr key={r.url} className="border-b last:border-none dark:border-gray-200">
                <td className="pr-4 py-3 whitespace-nowrap max-w-[15rem] truncate">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {r.url}
                  </a>
                </td>
                <td className="pr-2 py-1">{r.type}</td>
                <td className="py-1 text-right">{r.sizeKb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="rounded-lg p-6 shadow-md w-full space-y-8 animate-pulse bg-white">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <p className="mb-4">Загрузка анализа от Pagespeed...</p>
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="relative shrink-0">
          <div className="size-40 md:size-48 rounded-full bg-gray-200" />
          <div className="absolute inset-6 rounded-full bg-white" />
        </div>
        <ul className="flex flex-col gap-2 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="h-4 bg-gray-200 rounded w-1/2" />
          ))}
        </ul>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded p-4">
      {msg}
    </div>
  );
}

/* ───────────────────────── util ─────────────────────────────────── */
function color(v: number) {
  return v >= 90 ? 'text-green-500' : v >= 50 ? 'text-yellow-500' : 'text-red-500';
}

/* CategoryGauges.tsx */

type Scores = PageSpeedApiResponse['scores'];

function CategoryGauges({ scores }: { scores: Scores }) {
  const entries = Object.entries(scores).filter(([, v]) => v !== null) as [keyof Scores, number][];

  // Цвет по рейтингу
  const ringColor = (v: number) => (v >= 90 ? '#22c55e' : v >= 50 ? '#facc15' : '#ef4444');

  return (
    <div className="flex flex-wrap justify-between gap-8">
      {entries.map(([key, val]) => (
        <div key={key} className="flex flex-col items-center text-center">
          {/* ── круг ── */}
          <div
            className="relative size-72 rounded-full"
            style={{
              background: `conic-gradient(${ringColor(val)} ${val * 3.6}deg, #f5f5f5 ${
                val * 3.6
              }deg)`,
            }}
          >
            {/* <div className="text-2xl font-semibold text-gray-800"></div> */}
            {/* внутренний белый круг */}
            <div className=" absolute inset-4 rounded-full bg-white flex items-center justify-center ">
              <div className={` flex flex-col items-center`}>
                <p className={`text-7xl font-extrabold ${color(val)}`}>
                  {val}
                  <span className="text-5xl">/100</span>
                </p>

                <span className="mt-2 max-w-[8rem] text-sm leading-snug">{ruLabel(key)}</span>
              </div>
            </div>
          </div>

          {/* подпись */}
        </div>
      ))}
    </div>
  );
}

/* русские подписи, можно заменить на eng */
function ruLabel(k: keyof Scores) {
  switch (k) {
    case 'performance':
      return 'Производительность';
    case 'accessibility':
      return 'Специальные\nвозможности';
    case 'bestPractices':
      return 'Рекомендации';
    case 'seo':
      return 'Поисковая\nоптимизация';
    case 'pwa':
      return 'PWA';
    default:
      return k;
  }
}
