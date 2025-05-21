/* --------------------------------------------------------------------------
   components/TerminalLogs.tsx
   ──────────────────────────────────────────────────────────────────────────
   “Фейковый” терминал: показывает поток логов, постепенно добавляя строки.
   Шрифт — моноширинный, оформление напоминает классический Linux-tty.
-------------------------------------------------------------------------- */

'use client';

import { useEffect, useRef, useState } from 'react';

export type TerminalLogsProps = {
  logs: string[];          // входящие строки
  speed?: number;          // задержка в мс между символами (default 5)
};

export default function TerminalLogs({ logs, speed = 5 }: TerminalLogsProps) {
  const [printed, setPrinted] = useState<string[]>([]);
  const lineIdx  = useRef(0);
  const charIdx  = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // сбрасываем, если пришёл новый массив логов
  useEffect(() => {
    setPrinted([]);
    lineIdx.current = 0;
    charIdx.current = 0;
  }, [logs]);

  // тайп-эффект
  useEffect(() => {
    if (!logs.length) return;

    const id = setInterval(() => {
      const currentLine = logs[lineIdx.current] ?? '';

      // добавляем следующий символ
      if (charIdx.current < currentLine.length) {
        setPrinted(prev => {
          const copy = [...prev];
          copy[lineIdx.current] = (copy[lineIdx.current] || '') + currentLine[charIdx.current];
          return copy;
        });
        charIdx.current += 1;
      } else {
        // строка напечатана полностью → переходим к следующей
        if (lineIdx.current < logs.length - 1) {
          lineIdx.current += 1;
          charIdx.current = 0;
          setPrinted(prev => [...prev, '']);
        } else {
          clearInterval(id); // всё напечатали
        }
      }
    }, speed);

    return () => clearInterval(id);
  }, [logs, speed]);

  // автоскролл
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [printed]);

  const colorize = (txt: string) =>
    txt.includes('ERROR')
      ? 'text-red-400'
      : txt.includes('WARN')
      ? 'text-yellow-300'
      : 'text-green-400';

  /* ——————————————— render ——————————————— */
  return (
    <div className="rounded-lg bg-gray-900 text-[#d1d5db] font-mono text-sm p-4 shadow-inner">
      <div ref={scrollRef} className="h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed pr-2">
        {printed.map((l, i) => (
          <div key={i} className={colorize(l)}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
