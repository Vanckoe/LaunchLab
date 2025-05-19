import React from 'react';
import Accordeon from '../../components/ui/accordeon';
import Input from '@/components/ui/input';
import Github from '@/assets/github';

const NewProject = () => {
  return (
    <div className="flex flex-col w-full mx-auto container mt-[4rem]">
      <div className="mx-auto flex flex-col gap-5 rounded-2xl bg-white  py-5 px-7">
        <p className="text-2xl font-semibold">Новый проект: </p>
        <Input
          placeholder="Ссылка на github"
          className="pl-[3.3rem]! border border-gray-100"
          iconLeft={<Github color="#0D87EF" width="1.3rem" height="1.3rem" />}
        />
        <Accordeon />
      </div>
    </div>
  );
};

export default NewProject;
