'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';


// ⬇ shadcn/ui primitives -----------------------------------------------------
import { Switch } from './switch';
import Input from '@/components/ui/input';
// ---------------------------------------------------------------------------

/**
 * Utility to concatenate class names conditionally.
 * Replace with your own helper if you already have one.
 */
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// Row component
// ---------------------------------------------------------------------------
interface SettingRowProps {
  /** Поле заголовка */
  label: string;
  /** Плейсхолдер строки ввода */
  placeholder: string;
}

const SettingRow: React.FC<SettingRowProps> = ({ label, placeholder }) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <div className="space-y-2">
      {/* Label with small info icon */}
      <label className="text-sm font-medium flex items-center gap-1">
        {label}
      </label>

      {/* Input + toggle */}
      <div className="relative">
        <Input
          placeholder={placeholder}
          disabled={!enabled}
          className={cn(
            'pr-14 pl-5 bg-white placeholder:text-black border border-gray-100  placeholder:opacity-50 ', // space for the switch
            !enabled && 'opacity-50 cursor-not-allowed'
          )}
        />

        {/* Switch positioned to the right */}
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="absolute top-1/2 -translate-y-1/2 right-3"
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Accordion component
// ---------------------------------------------------------------------------

const BuildOutputSettings: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-lg bg-[#f3f4f680] p-6 w-full">
      {/* header */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between select-none"
      >
        <h2 className="text-lg font-semibold">Настройки Build и Command</h2>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden mt-6 flex flex-col gap-4"
          >
            <SettingRow
              label="Команда Build"
              placeholder="`npm run build` or `next build`"
            />
            <SettingRow
              label="Output Directory"
              placeholder="Next.js default"
            />
            <SettingRow
              label="Install Command"
              placeholder="`yarn install`, `npm install`, or `bun install`"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BuildOutputSettings;
