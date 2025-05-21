'use client';

import React, { useEffect, useState } from 'react';
import { GetProjectId } from '@/lib/utils/types';
import CanvasPreview from './citePreview';
import Link from 'next/link';

type HeroDashboardProps = GetProjectId;

const HeroDashboard: React.FC<HeroDashboardProps> = ({
  projectId,
  github,
  domainName,
  frameworkPreset,
  link,
  lastUpdated,
  securityLevel,
  functionCPU,
  buildStatus,
}) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const date = new Date(lastUpdated);
    setFormattedDate(date.toLocaleString());
  }, [lastUpdated]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col text-lg md:flex-row items-start gap-10">
        <CanvasPreview url={link} />
        <div className="flex flex-col md:flex-row w-full md:justify-between">
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Развертывание: </p>
              <Link href={link} className="text-[#0D87EF] text-base font-medium opacity-80">
                {link}
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">GitHub: </p>
              <Link href={github} className="text-[#0D87EF] text-base font-medium opacity-80">
                {github}
              </Link>
            </div>
            <div className="flex flex-row gap-10">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Статус билда:</p>{' '}
                <p className="">{buildStatus.state}</p>
                {buildStatus.errors.length > 0 && (
                  <ul className="text-red-500">
                    {buildStatus.errors.map((error, index) => (
                      <li key={index}>Error: {error}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Последнее обновление: </p>
                <p className="">{formattedDate}</p>
              </div>
            </div>
            <p>
              <span className="text-lg font-semibold"> Уровень защиты: </span> {securityLevel}
            </p>
            <p>
              <span className="text-lg font-semibold">Function CPU:</span>  {functionCPU.cpu} /{' '}
              {functionCPU.memory}
            </p>
          </div>
          <div className="flex text-end flex-col">
            {frameworkPreset}
            <p className="text-nowrap">id проекта: {projectId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;
