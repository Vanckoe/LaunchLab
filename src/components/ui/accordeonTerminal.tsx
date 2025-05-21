/* components/AccordeonTerminal.tsx */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import TerminalLogs from '@/components/ui/TerminalLogs';

interface AccordeonTerminalProps {
  /** Строки-логи, приходящие от бэкенда */
  logs: string[];
}

const AccordeonTerminal: React.FC<AccordeonTerminalProps> = ({ logs }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-lg bg-[#f3f4f680] p-6 w-full">
      {/* header */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex w-full items-center justify-between select-none"
      >
        <h2 className="text-lg font-semibold">Build / Runtime Logs</h2>
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
            className="overflow-hidden mt-6"
          >
            <TerminalLogs logs={logs} speed={1}/>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AccordeonTerminal;
