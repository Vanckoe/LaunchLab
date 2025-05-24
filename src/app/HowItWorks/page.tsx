/* app/how-it-works/page.tsx — compact card-driven layout */

import Link from 'next/link';
import Github from '@/assets/github';

export default function HowItWorks() {
  return (
    <main className="text-[#4A4A4A]">
      {/* ───────────── Hero ───────────── */}
      <section className="pt-20 bg-gradient-to-b ">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-[2.5rem]/tight font-extrabold leading-[100%]">
            Как работает Launch Lab?
          </h1>
          <p className="mt-3 text-lg text-[#4A4A4A]/80">
            От репозитория до HTTPS-домена — меньше минуты. Без DevOps, FTP и ручных скриптов.
          </p>
        </div>
      </section>

      {/* ───────────── Шаги ───────────── */}
      <section className="pt-0 md:pt-12">
        <div className="mx-auto max-w-[75rem] px-6 grid gap-3 md:gap-6 md:grid-cols-4">
          {steps.map(({ title, text, icon }, i) => (
            <article
              key={i}
              className="flex flex-col rounded-2xl shadow-sm ring-1 bg-white ring-[#f0f0f0] p-6 text-center"
            >
              <div
                className="mx-auto mb-4 size-12 rounded-full bg-white flex items-center justify-center"
                dangerouslySetInnerHTML={{
                  __html: `<svg width="26" height="26" fill="#4981FF">${icon}</svg>`,
                }}
              />
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-[#4A4A4A]/70">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───────────── KPI / Stats ───────────── */}
      <section className="py-10">
        <div className="mx-auto max-w-[56.25rem] px-6 grid gap-3 md:gap-6 sm:grid-cols-3 text-center">
          {stats.map(({ kpi, label }) => (
            <div
              key={kpi}
              className="rounded-2xl shadow-sm ring-1 bg-white ring-[#f0f0f0] py-6 px-3"
            >
              <span className="text-3xl font-bold text-[#4981FF]">{kpi}</span>
              <p className="mt-1 text-xs text-[#4A4A4A]/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="md:py-5 bg-[#f5f7f9]">
        <div className="mx-auto flex flex-col items-center max-w-[42.5rem] px-6 text-center">
          <h2 className="hidden md:block text-2xl font-semibold mb-6">
            Запусти свой проект прямо сейчас
          </h2>
          <Link
            href="/newProject"
            className="flex w-full text-xl md:w-fit justify-center items-center text-center rounded-lg bg-[#4981FF] px-8 py-4 text-white font-semibold
                       shadow hover:bg-[#3a6ede] transition-colors"
          >
            Начать бесплатно
          </Link>
          <h2 className="md:hidden  text-xl font-medium mt-4">Запусти свой проект <br /> прямо сейчас</h2>
        </div>
      </section>
    </main>
  );
}

/* ───────── data ───────── */
const steps = [
  {
    title: 'Подключи GitHub',
    text: 'Ссылка или выбор репо — мы сами определим фреймворк и клонируем код.',
    icon:  ' <path d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z" fill="#4981FF"></path>',
  },
  {
    title: 'Настрой ENV',
    text: 'Добавь ключи и секреты в пару кликов, без перезапуска.',
    icon: '<path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />',
  },
  {
    title: 'Смотри логи',
    text: 'Терминал в реальном времени — весь билд-процесс под контролем.',
    icon: '<path d="M4 4h16v14H4z" stroke="#4981FF" stroke-width="2" fill="none"/><path d="M7 9l4 3-4 3".../>',
  },
  {
    title: 'Управляй доменом',
    text: 'Привяжи домен, получи SSL за 1 клик и делись ссылкой.',
    icon: '<circle cx="12" cy="12" r="9" stroke="#4981FF" stroke-width="2" fill="none"/><path d="M2 12h20..."/>',
  },
];

const stats = [
  { kpi: '60 с', label: 'до production' },
  { kpi: '0 FTP', label: 'настройки сервера' },
  { kpi: '98/100', label: 'PageSpeed Perf.' },
];
