import Image from 'next/image';
import Input from '@/components/ui/input';
import Search from '@/assets/search';
import Button from '@/components/ui/button';
import CloudSearch from '@/assets/cloudSearch';
import ProjectCard from '@/components/ui/projectCard';
import Link from 'next/link';

const projectsData = [
  {
    github: 'https://github.com/Vanckoe/LaunchLab',
    domainName: 'Launch Lab',
    link: 'launch-lab-nine.vercel.app',
    lastUpdated: '2024-01-15 15:00',
    favicon: '/file.svg',
  },
  {
    github: 'https://github.com/user/weather-app',
    domainName: 'Weather App',
    link: 'https://weather-app.vercel.app',
    lastUpdated: '2024-01-10 10:00',
    favicon: '/file.svg',
  },
  {
    github: 'https://github.com/user/task-manager',
    domainName: 'Task Manager',
    link: 'https://task-manager.vercel.app',
    lastUpdated: '2024-01-05 14:30',
    favicon: '/file.svg',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full mx-auto container mt-[4rem]">
      <div className="flex flex-row items-stretch gap-5">
        <Input
          className="bg-white text-gray-900"
          iconLeft={<CloudSearch width="2rem" height="2rem" />}
          placeholder="Поиск проекта"
        />
        <Link href={'/newProject'}>
          <Button>Добавить сайт...</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-10 w-full text-gray-900">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            github={project.github}
            domainName={project.domainName}
            link={project.link}
            lastUpdated={project.lastUpdated}
            favicon={project.favicon}
          />
        ))}
      </div>
    </div>
  );
}
