import { DialogDemo } from "@/components/add-todo-modal";
import { CardComponent } from "@/components/content-card";
import { DefaultDemo } from "@/components/test.2";
import { DarkModeToggleCheckboxDemo } from "@/components/theme-toggle";
import { useFetchContent } from "@/hooks/useFetchContent";
import { useEffect, useState } from "react";
import 'ldrs'

export const DashBoard = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  const{content,FetchData}=useFetchContent();
//   console.log(content);
//   FetchData();
  return (
    <div className="min-h-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative ">
        
      <div className=" pt-10 mx-10 flex justify-between">
        <div className="flex">
        <DefaultDemo />
        <DarkModeToggleCheckboxDemo/>
        </div>
        <DialogDemo/>
      </div>
        <div className="flex flex-wrap justify-between mx-10">
        {content.map(({title,content,done,_id}) =><CardComponent
        title={title}
        desc={content}
        done={done}
        id={_id}
        />)}
        </div>
      
    </div>
  );
};
