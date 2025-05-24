import Link from 'next/link';
import Image from 'next/image';

export default function HeroLaunchLab() {
  return (
    <section className="relative overflow-hidden">
      {/* фоновая декоративная «облако-сетка» */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(73,129,255,0.08)_0%,transparent_60%)]"
      />

      <div className="mx-auto max-w-6xl px-4 py-24 md:py-20 flex flex-col lg:flex-row items-center gap-14">
        {/* ---- Текстовый столбец ---- */}
        <div className="flex-1 max-w-xl">
          {/* лого-строка */}
          {/* <div className="flex items-center gap-3 mb-6">
              <Link href={'/'}>
                <Image
                  src={'/logo.png'}
                  alt="logo"
                  width={192}
                  height={192}
                  className="size-[3.5rem]"
                />
              </Link>
            <span className="text-xl font-semibold text-[#4A4A4A]">Launch Lab</span>
          </div> */}

          <h1 className="text-4xl/tight md:text-5xl font-bold text-[#4A4A4A]">
            Разверни сайт за 60 секунд — без FTP и DevOps
          </h1>
          <div className=" md:hidden flex-1 w-full max-w-lg shrink-0">
            <img
              src="/dashboard-preview.png"
              alt="Скриншот дашборда Launch Lab"
              className="w-full rounded-2xl shadow-lg "
            />
          </div>
          <p className="mt-6 text-lg text-[#4A4A4A]/80">
            Launch Lab автоматически собирает проект с GitHub и деплоит его на сервер Ismet.kz за
            считанные секунды. Подключай домен, следи за логами и анализируй PageSpeed без стрессов.
          </p>

          {/* список преимуществ */}
          <ul className="mt-8 space-y-3 text-[#4A4A4A]">
            {[
              'One-click Deploy c Bun build',
              'Realtime логи и уведомления',
              'PageSpeed Insights в дашборде',
              'Управление ENV и SSL-доменами',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <svg width="20" height="20" fill="#4981FF" className="mt-[2px]">
                  <path d="M7.5 14.5 3 10l1.4-1.4 3.1 3.1 8.1-8.1L17 5l-9.5 9.5Z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex w-full md:w-fit items-center justify-center rounded-lg bg-[#4981FF] px-8 py-4 text-white font-medium shadow-md hover:bg-[#3a6ede] transition"
            >
              Создать проект
            </Link>
            <Link href="/HowItWorks" className="text-[#4981FF] font-medium hover:underline">
              Узнать как это работает →
            </Link>
          </div>
        </div>

        {/* ---- Иллюстрация / mockup ---- */}
        <div className="hidden md:flex flex-1 w-full max-w-lg shrink-0">
          <img
            src="/dashboard-preview.png"
            alt="Скриншот дашборда Launch Lab"
            className="w-full rounded-2xl shadow-lg "
          />
        </div>
      </div>
    </section>
  );
}
