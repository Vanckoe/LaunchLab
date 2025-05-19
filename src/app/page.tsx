import Image from 'next/image';
import Input from '@/components/ui/input';
import Search from '@/assets/search';
import Link from 'next/link';
import Github from '@/assets/github';
import CloudPaper from '@/assets/cloud-paper';
import Button from '@/components/ui/button';
import ProjectCard from '@/components/ui/projectCard';

const projectsData = [
  {
    projectName: 'Launch Lab',
    projectUrl: 'https://launch-lab-nine.vercel.app',
    githubUrl: 'https://github.com/user/launch-lab',
    lastModified: '2024-01-15',
  },
  {
    projectName: 'Weather App',
    projectUrl: 'https://weather-app.vercel.app',
    githubUrl: 'https://github.com/user/weather-app',
    lastModified: '2024-01-10',
  },
  {
    projectName: 'Task Manager',
    projectUrl: 'https://task-manager.vercel.app',
    githubUrl: 'https://github.com/user/task-manager',
    lastModified: '2024-01-05',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full mx-auto container mt-[4rem]">
      <div className="flex flex-row items-center  gap-5">
        <Input className="bg-white" iconLeft={<Search width="1.8rem" height="1.8rem" />} />
        <div className="w-[15rem] p-[1.5rem] bg-amber-700"></div>
      </div>
      <div className="grid grid-cols-3 gap-7 mt-10 w-full">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            projectName={project.projectName}
            projectUrl={project.projectUrl}
            githubUrl={project.githubUrl}
            lastModified={project.lastModified}
          />
        ))}
      </div>
    </div>
  );
}
