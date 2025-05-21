'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import HeroDashboard from './_components/heroDashboard';
import { GetProjectId } from '@/lib/utils/types';
import PageSpeedCard from '@/app/dashboard/_components/pageSpeedCard';
import AccordeonTerminal from '@/components/ui/accordeonTerminal';
import DashboardButtons from './_components/dashboardButtons';

import { mockLogs, jsonData } from '../../data/mockData';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 w-full mx-auto container mt-[4rem]">
      <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
        <p className="text-3xl font-medium">{jsonData.domainName}</p>
        <DashboardButtons />
      </div>

      <div className="flex flex-col w-full h-[1px] bg-black opacity-30"></div>

      <div className="mx-auto flex flex-col gap-5 rounded-2xl w-full bg-white py-7 px-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
          <p className="text-2xl font-medium">Развертывание проекта</p>
        </div>
        <HeroDashboard {...jsonData} />
        <AccordeonTerminal logs={mockLogs} />
        <PageSpeedCard url={jsonData.link} />
      </div>
    </div>
  );
};

export default Dashboard;
