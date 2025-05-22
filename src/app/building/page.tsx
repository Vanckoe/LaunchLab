/* pages/NewProject.tsx */
'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AccordeonTerminal from '@/components/ui/accordeonTerminal';
import Button from '@/components/ui/button';
import { mockLogs } from '@/data/mockData';

export default function NewProject() {
  const [logOpen, setLogOpen] = useState(false);
  
  return (
    <main className="flex justify-center pt-16 px-4">
      <section className="w-full max-w-2xl rounded-[1rem] bg-white shadow-xl ring-1 ring-[#f5f7f9] flex flex-col gap-8 px-8 py-10">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Loader2 className="size-6 animate-spin text-[#4981FF]" />
            <h1 className="text-3xl font-semibold text-[#4A4A4A]">Разворачиваем проект</h1>
          </div>

          <p className="text-base leading-relaxed text-[#4A4A4A]/80">
            <span className="font-medium text-blue-600">Пожалуйста, не закрывайте страницу. </span>
            Сборка и&nbsp;деплой запущены автоматически и&nbsp;обычно занимают
            <span className="font-medium text-[#4A4A4A]"> около минуты</span>.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Вы можете{' '}
            <span
              onClick={() => setLogOpen(true)}
              className="font-semibold underline cursor-pointer"
            >
              развернуть лог сборки
            </span>{' '}
            ниже, чтобы увидеть статус развёртывания в реальном времени и убедиться, что всё
            проходит успешно.
          </p>
        </header>
        <AccordeonTerminal logs={mockLogs} speed={1} open={logOpen} setOpen={setLogOpen} />
        <p className="text-base text-gray-700 leading-relaxed">
          Если потребуется помощь, команда поддержки всегда готова ответить на ваши вопросы.
        </p>
        <footer className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-[#f5f7f9] pt-6">
          <div className="flex items-center gap-2 text-[#4A4A4A]/70 text-xs">
            <CheckCircle2 className="size-4 text-[#4981FF]" />
            <span>Готово? Перейдите в дашборд.</span>
          </div>

          <Link href="/dashboard" className="sm:ml-auto">
            <Button variant="primaryFull" className="text-lg py-4 px-10">
              В&nbsp;дашборд
            </Button>
          </Link>
        </footer>
      </section>
    </main>
  );
}
