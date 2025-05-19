import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Github from '@/assets/github';
import CloudPaper from '@/assets/cloud-paper';

interface ProjectCardProps {
  projectName: string;
  projectUrl: string;
  githubUrl: string;
  lastModified: string;
}

const ProjectCard = ({ projectName, projectUrl, githubUrl, lastModified }: ProjectCardProps) => {
  return (
    <div className="shadow bg-white flex flex-col gap-5 rounded-2xl py-5 px-7">
      <div className="flex flex-row items-center gap-3">
        <Image src={'/file.svg'} alt="favicon" width={40} height={40} className="size-[2rem]" />
        <div className="flex flex-col">
          <p className="text-xl font-medium">{projectName}</p>
          <Link href={projectUrl} className="text-lg leading-[100%] underline font-normal">{projectUrl}</Link>
        </div>
      </div>
      <Link
        href={githubUrl}
        className="py-1 px-5 w-fit text-sm text-[#0D87EF] font-semibold flex flex-row items-center gap-3 rounded-4xl bg-gray-200"
      >
        <Github color="#0D87EF" width="1.3rem" height="1.3rem" />
        {githubUrl}
      </Link>
      <div className="flex flex-row items-center gap-2">
        <CloudPaper width="1.5rem" height="1.5rem" />
        <p className="">Last modified: {lastModified}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
