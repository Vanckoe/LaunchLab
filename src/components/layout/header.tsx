import React from 'react';
import Image from 'next/image';
import User from '@/assets/User';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full mx-auto mt-4 container">
      <div className="flex flex-row items-center gap-4">
        <Link href={'/projects'}>
          <Image src={'/logo.png'} alt="logo" width={192} height={192} className="size-[3.5rem]" />
        </Link>
        <p className="text-xl font-medium leading-[100%]">
          Launch <br /> Laboratory
        </p>
      </div>
      <div className="flex flex-row items-center gap-5">
        <nav className="text-lg hidden md:flex flex-row items-center gap-3">
          <button
            //   onClick={() => scrollToSection('id2')}
            className="text-[#A8A8A8] font-light hover:text-[#000000]"
          >
            Changelog
          </button>
          <button
            //   onClick={() => scrollToSection('id3')}
            className="text-[#A8A8A8] font-light hover:text-[#000000]"
          >
            Help
          </button>
          <button
            //   onClick={() => scrollToSection('id4')}
            className="text-[#A8A8A8] font-light hover:text-[#000000]"
          >
            Docs
          </button>
          <Link
            href={'https://www.ismet.kz/ru/it-resheniya/kontakty'}
            //   onClick={() => scrollToSection('id4')}
            className="text-[#A8A8A8] font-light hover:text-[#000000]"
          >
            Контакты
          </Link>
        </nav>
        <div className="size-[3rem] flex items-center cursor-progress justify-center bg-blue-500 rounded-full">
          <User color="white" width="1.5rem" height="1.5rem" />
        </div>
      </div>
    </div>
  );
};

export default Header;
