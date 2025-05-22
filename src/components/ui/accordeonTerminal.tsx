/* components/AccordeonTerminal.tsx */
'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import TerminalLogs from '@/components/ui/TerminalLogs';

interface AccordeonTerminalProps {
  logs: string[];
  speed?: number;
  /** опционально: управлять извне  */
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function AccordeonTerminal({
  logs,
  speed,
  open: controlledOpen,
  setOpen: controlledSetOpen,
}: AccordeonTerminalProps) {
  /* — если пропы не пришли, создаём своё состояние — */
  const [internalOpen, internalSetOpen] = useState(false);
  const open   = controlledOpen   ?? internalOpen;
  const setOpen = controlledSetOpen ?? internalSetOpen;

  return (
    <section className="rounded-lg bg-[#f3f4f680] p-6 w-full">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex w-full items-center justify-between select-none"
        aria-expanded={open}
      >
        <h2 className="text-lg font-semibold">Build / Runtime Logs</h2>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden mt-6"
          >
            <TerminalLogs logs={logs} speed={speed} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
