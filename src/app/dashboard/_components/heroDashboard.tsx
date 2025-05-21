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

const HeroDashboard: React.FC<HeroDashboardProps> = ({
  title,
  domain,
  createdBy,
  hoursAgo,
  status,
}) => {
  return (
   <div className="">
    <div className=""></div>
   </div>
  );
};

export default HeroDashboard;
