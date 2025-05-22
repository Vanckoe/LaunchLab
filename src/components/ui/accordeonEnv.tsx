'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import Input from '@/components/ui/input';

interface EnvRow {
  key: string;
  value: string;
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// ----------------------------------------------------
// Single row component (Key | Value | Remove)
// ----------------------------------------------------
interface SettingRowProps {
  index: number;
  data: EnvRow;
  onChange: (index: number, field: keyof EnvRow, value: string) => void;
  onRemove: (index: number) => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ index, data, onChange, onRemove }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Key */}
      <Input
        placeholder="Ключ"
        value={data.key}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(index, 'key', e.target.value)
        }
        className="flex-1 bg-white py-4! rounded-xl! border border-gray-100 placeholder:text-black placeholder:opacity-50 pl-5"
      />

      {/* Value */}
      <Input
        placeholder="Значение"
        value={data.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(index, 'value', e.target.value)
        }
        className="flex-1 bg-white py-4! rounded-xl! border border-gray-100 placeholder:text-black placeholder:opacity-50 pl-5"
      />

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className=" px-5 py-5 bg-white shadow rounded-xl! border border-gray-100 flex items-center justify-center hover:bg-neutral-800/40 transition-colors"
        aria-label="Remove row"
      >
        <Minus size={16} />
      </button>
    </div>
  );
};

// ----------------------------------------------------
// Accordion component
// ----------------------------------------------------
const AccordeonEnv: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<EnvRow[]>([{ key: '', value: '' }]);

  // Handlers
  const handleChange = (index: number, field: keyof EnvRow, value: string) => {
    setRows(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value } as EnvRow;
      return updated;
    });
  };

  const handleRemove = (index: number) => {
    setRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setRows(prev => [...prev, { key: '', value: '' }]);
  };

  return (
    <section className="rounded-lg bg-[#f3f4f680] p-6 w-full">
      {/* header */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex w-full items-center justify-between select-none"
      >
        <h2 className="text-lg font-semibold">Environment Variables</h2>
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
            className="overflow-hidden mt-6 flex flex-col gap-3"
          >
            {rows.map((row, idx) => (
              <SettingRow
                key={idx}
                index={idx}
                data={row}
                onChange={handleChange}
                onRemove={handleRemove}
              />
            ))}

            {/* Add more */}
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-xl! border border-gray-100 mt-5 bg-white w-fit px-5 py-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <Plus size={18} /> Add More
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AccordeonEnv;
