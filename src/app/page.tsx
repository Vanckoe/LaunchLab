import Image from 'next/image';
import Input from '@/components/ui/input';
import Search from '@/assets/search';
import Link from 'next/link';
import Github from '@/assets/github';
import CloudPaper from '@/assets/cloud-paper';

export default function Home() {
  return (
    <div className="flex flex-col w-full mx-auto container mt-[4rem]">
      <div className="flex flex-row items-center  gap-5">
        <Input iconLeft={<Search width="1.8rem" height="1.8rem" />} />
        <div className="w-[15rem] p-[1.5rem] bg-amber-700"></div>
      </div>
      <div className="grid grid-cols-3 gap-7 mt-10 w-full">
        <div className="shadow bg-white flex flex-col gap-5 rounded-2xl py-5 px-7">
          <div className="flex flex-row items-center gap-3">
            <Image src={'/file.svg'} alt="favicon" width={40} height={40} className="size-[2rem]" />
            <div className="flex flex-col">
              <p className="text-xl font-medium">Project name</p>
              <p className="text-lg leading-[100%] underline font-normal">http://localhost:3000/</p>
            </div>
          </div>
          <Link
            href={'#!'}
            className="py-1 px-5 w-fit text-sm text-[#0D87EF] font-semibold flex flex-row items-center gap-3 rounded-4xl bg-gray-200"
          >
            <Github color='#0D87EF' width="1.3rem" height="1.3rem" />
            https://github.com/Vanckoe/LaunchLab
          </Link>
          <div className="flex flex-row items-center gap-2">
            <CloudPaper width='1.5rem' height='1.5rem'/>
            <p className="">Last modified: 15.05.2025 </p>
          </div>
        </div>
      </div>
    </div>
  );
}
