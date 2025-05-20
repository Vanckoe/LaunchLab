import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import HeroDashboard from './_components/heroDashboard';


const jsonData = {
  title: "Workflow",
  domain: "launch-lab-nine.vercel.app",
  createdBy: "vanckoe",
  hoursAgo: 14,
  status: "Ready",
};
const Dashboard = () => {

  return (
    <div className="flex flex-col gap-5 w-full mx-auto container mt-[4rem]">
      <div className="flex flex-row items-center justify-between">
        <p className="text-3xl font-medium">under developing</p>
        <div className="flex flex-row items-center gap-2">
          <Button className="py-4">Домен</Button>
          <Link href={'https://launch-lab-nine.vercel.app/'}>
            <Button className="py-4">Твой сайт</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full h-[1px] bg-black opacity-30"></div>

      <div className="mx-auto flex flex-col gap-5 rounded-2xl w-full bg-white  py-7 px-7">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-medium">Развертывание проекта</p>
          <div className="flex flex-row items-center gap-2">
            <Button className="py-4">build logs</Button>
            <Link href={'https://launch-lab-nine.vercel.app/'}>
              <Button className="py-4">Пересобрать проект</Button>
            </Link>
          </div>
        </div>
        <HeroDashboard {...{...jsonData, status: jsonData.status as "Ready" | "Error" | "Building"}} />
      </div>
    </div>
  );
};

export default Dashboard;
