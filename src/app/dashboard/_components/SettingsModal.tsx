'use client';

import { MouseEvent } from 'react';
import {  Settings } from 'lucide-react';
import Link from 'next/link';
import Github from '@/assets/github';
import Left from '@/assets/Left';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import AccordeonBuild from '@/components/ui/accordeonBuild';
import AccordeonEnv from '@/components/ui/accordeonEnv';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  if (!open) return null;

  // останавливаем «клик-сквозь» по самой карточке
  const stop = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
      aria-modal
      role="dialog"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl
                   px-7 py-7 flex flex-col gap-6"
        onClick={stop}
      >
        {/* header */}
        <div className="flex items-center gap-4">
          <button onClick={onClose} aria-label="Закрыть" className="p-2 -m-2">
            <Settings />
          </button>
          <h2 className="text-3xl font-semibold">Настройка сборки</h2>
        </div>

        {/* form */}
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Ссылка на GitHub"
            className="pl-12 border-gray-100"
            iconLeft={<Github color="#0D87EF" width="1.3rem" height="1.3rem" />}
          />

          <Input
            placeholder="Домен"
            className="pl-12 border-gray-100"
            iconLeft={<Left color="#0D87EF" width="1.3rem" height="1.3rem" />}
          />
        </div>

        <AccordeonBuild />
        <AccordeonEnv />

        <Link href="/building" className="mt-4">
          <Button variant="primaryFull" className="w-full">
            Развертывание
          </Button>
        </Link>
      </div>
    </div>
  );
}
