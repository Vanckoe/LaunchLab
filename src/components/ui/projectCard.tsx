import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Github from '@/assets/github';
import CloudPaper from '@/assets/cloud-paper';
import Left from '@/assets/Left';

interface ProjectCardProps {
  github: string;
  domainName: string;
  link: string;
  lastUpdated: string;
  favicon: string; // URL here'/file.svg'
}

const ProjectCard = ({ domainName, link, github, lastUpdated, favicon }: ProjectCardProps) => {
  return (
    <div className="shadow bg-white flex flex-col gap-7 rounded-2xl py-5 px-7">
      <div className="flex flex-row items-center gap-5">
        <Image src={favicon} alt="favicon" width={40} height={40} className="size-[2rem]" />
        <div className="flex flex-col gap-1">
          <p className="text-xl font-medium">{domainName}</p>
          <Link href={link} className="text-base leading-[100%] underline font-normal">
            {link}
          </Link>
        </div>
      </div>
      <Link
        href={github}
        className="py-2 px-5 w-fit text-sm text-[#0D87EF] font-semibold flex flex-row items-center gap-3 rounded-4xl bg-gray-100"
      >
        <Github color="#0D87EF" width="1.3rem" height="1.3rem" />
        {github}
      </Link>

      <Link href={'#!'} className="flex -mt-3 flex-row items-end justify-between">
        <div className="flex flex-row items-center gap-2">
          <CloudPaper width="1.5rem" height="1.5rem" />
          <p className="">Last modified: {lastUpdated}</p>
        </div>
        <Left color='black'/>
      </Link>
    </div>
  );
};

export default ProjectCard;
