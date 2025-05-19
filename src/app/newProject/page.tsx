import React from 'react';
import Accordeon from '../../components/ui/accordeonBuild';
import Input from '@/components/ui/input';
import Github from '@/assets/github';
import Left from '@/assets/Left';
import Button from '@/components/ui/button';
// import Attention from '@/assets/attention';
import AccordeonEnv from '@/components/ui/accordeonEnv';

const NewProject = () => {
  return (
    <div className="flex flex-col w-full mx-auto container mt-[4rem]">
      <div className="mx-auto flex flex-col gap-5 rounded-2xl md:max-w-[50rem] w-full bg-white  py-7 px-7">
        <p className="text-3xl font-semibold">Новый проект: </p>

        <div className="flex flex-col gap-2">
          <p className="">Выберите, где какой проект хотите создать, и дайте ему название.</p>
          {/* <Input
            placeholder="Сертификат защиты"
            className="pl-[3.3rem]! border bg-[#f3f4f680] border-gray-200 cursor-not-allowed"
            iconLeft={<Attention color="#0D87EF" width="2rem" height="2rem" />}
          /> */}
          <Input
            placeholder="Ссылка на github"
            className="pl-[3.3rem]! border border-gray-100"
            iconLeft={<Github color="#0D87EF" width="1.3rem" height="1.3rem" />}
          />
          <Input
            placeholder="Выберите домен"
            className="pl-[3.3rem]! border border-gray-100"
            iconLeft={<Left color="#0D87EF" width="1.3rem" height="1.3rem" />}
          />
        </div>
        <Accordeon />
        <AccordeonEnv />
        <Button variant={'primaryFull'}>Развертывание</Button>
      </div>
    </div>
  );
};

export default NewProject;
