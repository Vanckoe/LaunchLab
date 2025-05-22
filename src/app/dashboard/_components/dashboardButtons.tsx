'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import SettingsModal from './SettingsModal';

export default function DashboardButtons() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SettingsModal open={open} onClose={() => setOpen(false)} />

      <div className="flex items-center gap-2">
        <Button className="py-3 w-full">Домен</Button>

        <Link href="" className="w-full">
          <Button className="py-3">Пересобрать проект</Button>
        </Link>

        <Button className="py-3 w-full" onClick={() => setOpen(true)}>
          Настройки
        </Button>
      </div>
    </>
  );
}
