import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useNavigate } from "react-router-dom"
import { AlertDemo } from "./ui/alert-success"

export function LoginForm2({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate=useNavigate();
    const [visible,setVisible]=useState(false);
    function dialogueFun()
    {
      setVisible(true);
    }

    useEffect(()=>{
      
      if(visible)
      {
        const timer=setTimeout(()=>{
          setVisible(false)
          navigate("/dashboard")
        },2000)
        return ()=> clearTimeout(timer);
      }
    },[visible,navigate])

    
    const inputRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    async function submitFun(event: React.FormEvent) {
      event.preventDefault(); // Prevent form from refreshing the page
      console.log("Hello");
      const input=inputRef.current?.value;
      const password=passwordRef.current?.value;

      const response=await axios({
        method:"post",
        url:BACKEND_URL+"login",
        data:{
        input:input,
          password:password
        }
      })
      console.log(response.data);
      const token=response.data.token;
      localStorage.setItem("token",token);

      dialogueFun();
    }

    
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
      {visible && <AlertDemo desc="Login SuccessFull"/>}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-white">Login</CardTitle>
            <CardDescription>
              Enter your email or username to Login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitFun}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email/ Username</Label>
                  <Input
                    type="text"
                    placeholder="m@example.com"
                    required
                    ref={inputRef}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required ref={passwordRef}/>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <span className="underline underline-offset-4 cursor-pointer" onClick={()=>{navigate("/signup")}}> Signup</span>
                  
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
}
