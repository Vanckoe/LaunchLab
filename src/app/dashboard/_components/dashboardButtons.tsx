import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';


const DashboardButtons = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Button className="py-3 w-full">Домен</Button>
      <Link href={''} className='w-full'>
        <Button className="py-3">Пересобрать проект</Button>
      </Link>
      <Link href={''} className='w-full'>
        <Button className="py-3">Настройки</Button>
      </Link>
    </div>
  );
};

export default DashboardButtons;
