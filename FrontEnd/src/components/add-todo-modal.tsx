import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { AlertDemo } from "./ui/alert-success"
import { useFetchContent } from "@/hooks/useFetchContent"




export function DialogDemo() {
  const titleRefrence=useRef<HTMLInputElement>(null);
  const descRef=useRef<HTMLTextAreaElement>(null);

  const{content,FetchData}=useFetchContent();

  const [visible,setVisible]=useState(false);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setVisible(false);
    },1500)
    return ()=>{
      clearTimeout(timer);
    }
  })
  
  useEffect(()=>{
    FetchData();
  },[visible])

  async function submitFun()
  {

    const title=titleRefrence.current?.value;
    const desc=descRef.current?.value;

    const response=await axios({
      method:"post",
      url:BACKEND_URL+"content",
      data:{
        title:title,
        content:desc
      },
      headers:{
        authorization:localStorage.getItem("token")
      }
    })
    console.log(response.data);
    setVisible(true);
  }
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline"> <span className="font-[poppins] text-gray-400">Add Todo</span>
        <i className="ri-add-line font-bold text-md text-gray-400"></i>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      { visible && <AlertDemo desc="To Do Added"/>}
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
           Click Add When You are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              defaultValue="Title"
              className="col-span-3"
              ref={titleRefrence}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea placeholder="Add Your Desc Here" 
            className="col-span-3 max-h-36"
            ref={descRef}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitFun}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
