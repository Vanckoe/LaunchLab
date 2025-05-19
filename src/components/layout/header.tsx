import React from 'react';
import Logo from '@/assets/logo';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full mx-auto mt-4 container">
      <div className="flex flex-row items-center gap-4">
        <Image src={'/logo.png'} alt="logo" width={192} height={192} className="size-[3.5rem]" />
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
        </nav>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Header;
