'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import HeroDashboard from './_components/heroDashboard';
import { GetProjectId } from '@/lib/utils/types';
import CanvasPreview from './_components/citePreview';

const jsonData: GetProjectId = {
  projectId: '1',
  github: 'https://github.com/user/repo1',
  domainName: 'launch-lab-nine.vercel.app',
  frameworkPreset: 'Next.js',
  link: 'https://launch-lab-nine.vercel.app/',
  lastUpdated: '2025-05-19T14:00:00Z',
  securityLevel: 'Standart',
  functionCPU: {
    cpu: '0.6 vCPU',
    memory: '1 GB',
  },
  buildStatus: {
    state: 'Ready',
    errors: [],
  },
};

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 w-full mx-auto container mt-[4rem]">
      <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
        <p className="text-3xl font-medium">{jsonData.domainName}</p>
        <div className="flex flex-row items-center gap-2">
          <Button className="py-4">Домен</Button>
          <Link href={jsonData.link}>
            <Button className="py-4">{jsonData.link}</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full h-[1px] bg-black opacity-30"></div>

      <div className="mx-auto flex flex-col gap-5 rounded-2xl w-full bg-white py-7 px-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
          <p className="text-2xl font-medium">Развертывание проекта</p>
        </div>
        <HeroDashboard {...jsonData} />
        <div className="flex flex-row items-center gap-2">
          <Button className="py-4">build logs</Button>
          <Link href={jsonData.link}>
            <Button className="py-4">Пересобрать проект</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
