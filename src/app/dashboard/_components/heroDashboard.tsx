'use client';

import React from 'react';
import { Globe, ExternalLink, Code } from 'lucide-react';

interface HeroDashboardProps {
  title: string;
  domain: string;
  createdBy: string;
  hoursAgo: number;
  status: 'Ready' | 'Error' | 'Building';
}

const statusColors = {
  Ready: 'bg-green-500',
  Error: 'bg-red-500',
  Building: 'bg-yellow-500',
};

const HeroDashboard: React.FC<HeroDashboardProps> = ({ title, domain, createdBy, hoursAgo, status }) => {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg flex gap-6 items-start">
        <iframe
            src={'https://' +domain}
            className={("w-1/2 h-[25rem] border-none")}
          ></iframe>
      <div className="flex-1">
        <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
        <div className="flex items-center gap-2 mb-1">
          <Globe size={16} className="text-gray-400" />
          <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            {domain}
          </a>
        </div>
        <div className="text-sm text-gray-400">Created {hoursAgo}h ago by {createdBy}</div>
      </div>

      <div className="flex flex-col items-end">
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
        <div className="mt-4 flex items-center gap-2">
          <a href="#" className="text-gray-400 hover:text-white">
            <Code size={16} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;
