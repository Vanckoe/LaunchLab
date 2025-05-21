'use client';

import { useEffect, useState } from 'react';
import { PageSpeedApiResponse } from '@/lib/utils/types';

interface PageSpeedCardProps {
  url: string;
  strategy?: 'mobile' | 'desktop';
}

export default function PageSpeedCard({ url, strategy = 'mobile' }: PageSpeedCardProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PageSpeedApiResponse | null>(null);
  const [error, setError] = useState('');

  /* ───────────────────────────── fetch ───────────────────────────── */
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

  /* ───────────────────────── helpers ─────────────────────────────── */
  const color = (v: number) =>
    v >= 90 ? 'text-green-500' : v >= 50 ? 'text-yellow-500' : 'text-red-500';

  if (loading) return <Skeleton />;
  if (error) return <ErrorBox msg={error} />;

  if (!data) return null;

  /* ───────────────────────── UI ──────────────────────────────────── */
  return (
    <div className=" rounded-lg p-6 shadow-md w-full space-y-6">
      <Header url={url} strategy={strategy} />

      {/* Categories */}
      {/* <CategoryScores {...data.scores} /> */}
      <div className="flex flex-col md:flex-row w-full gap-20">
        {/* Performance + Web Vitals */}
        <PerfBlock perf={data.scores.performance} metrics={data.metrics} />

        {/* Opportunities */}
        <OpportunitiesList list={data.opportunities} />

        {/* Diagnostics */}
        <Diagnostics diag={data.diagnostics} />
      </div>
      {/* Heavy Resources */}
      <HeavyResources resources={data.network} />

      {/* Final Screenshot */}
      {/* {data.screenshots.final && <FinalScreenshot img={data.screenshots.final} />} */}
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

// function CategoryScores(scores: PageSpeedApiResponse['scores']) {
//   return (
//     <div className="flex flex-wrap gap-4">
//       {Object.entries(scores).map(
//         ([k, v]) =>
//           v !== null && (
//             <span key={k} className={`px-2 py-1 rounded text-sm font-medium ${color(v)}`}>
//               {k}: {v}
//             </span>
//           )
//       )}
//     </div>
//   );
// }

function PerfBlock({ perf, metrics }: { perf: number; metrics: PageSpeedApiResponse['metrics'] }) {
  const vitalsOrder: (keyof typeof metrics)[] = ['fcp', 'lcp', 'cls', 'tbt', 'tti', 'si'];
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className={`text-8xl font-extrabold ${color(perf)}`}>
        {perf}
        <span className="text-7xl">/100</span>
      </div>
      <ul className="text-xl space-y-1 w-full md:w-fit">
        {vitalsOrder.map(k => (
          <li key={k} className='flex flex-row w-full md:w-fit justify-between md:justify-items-start gap-1'>
            <p className=""><strong className="uppercase">{k}</strong>:</p>
            <p className=""> {metrics[k].displayValue}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OpportunitiesList({ list }: { list: PageSpeedApiResponse['opportunities'] }) {
  if (!list.length) return null;
  return (
    <div>
      <h3 className="font-semibold mb-2">Рекомендации по оптимизации</h3>
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
    <div>
      <h3 className="font-semibold mb-2">Диагностика</h3>
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
      <h3 className="font-semibold mb-2">Тяжёлые ресурсы (Top 10)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b dark:border-neutral-700">
              <th className="text-left py-1 pr-4">URL</th>
              <th className="text-left py-1 pr-2">Тип</th>
              <th className="text-right py-1">KB</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(r => (
              <tr key={r.url} className="border-b last:border-none dark:border-neutral-700">
                <td className="pr-4 py-1 whitespace-nowrap max-w-[240px] truncate">
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
    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-md w-full animate-pulse">
      <p className="mb-4">Загрузка анализа от Pagespeed...</p>
      <div className="flex flex-row gap-4">
        <div className="h-5 bg-gray-300  rounded w-1/6 mb-6" />
        <div className="h-5 bg-gray-300  rounded w-1/4 mb-6" />
      </div>
      <div className="h-8 bg-gray-300  rounded w-1/3 mb-4" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-300  rounded" />
        ))}
      </div>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 rounded p-4">
      {msg}
    </div>
  );
}

/* ───────────────────────── util ─────────────────────────────────── */
function color(v: number) {
  return v >= 90 ? 'text-green-500' : v >= 50 ? 'text-yellow-500' : 'text-red-500';
}
