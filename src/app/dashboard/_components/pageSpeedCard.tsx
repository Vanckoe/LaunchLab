'use client';

import { useEffect, useState } from 'react';

interface PageSpeedCardProps {
  url: string;
}

export default function PageSpeedCard({ url }: PageSpeedCardProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    score: number;
    fcp: string;
    lcp: string;
    cls: string;
    tti: string;
  } | null>(null);

  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`/api/pagespeed?url=${encodeURIComponent(url)}`);
        const json = await res.json();

        if (res.ok) {
          setData(json);
        } else {
          setError(json.error || 'Ошибка при загрузке данных');
        }
      } catch (e) {
        setError('Ошибка подключения к API');
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  const getColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-lg p-6 shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">
        Google PageSpeed для: <span className="underline">{url}</span>
      </h2>

      {loading && <p className="text-gray-500">Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="space-y-3">
          <div className={`text-4xl font-bold ${getColor(data.score)}`}>{data.score}/100</div>
          <div className="text-sm text-gray-500">Performance Score</div>

          <ul className="text-sm mt-4 space-y-1">
            <li>
              <strong>FCP:</strong> {data.fcp}
            </li>
            <li>
              <strong>LCP:</strong> {data.lcp}
            </li>
            <li>
              <strong>CLS:</strong> {data.cls}
            </li>
            <li>
              <strong>TTI:</strong> {data.tti}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
