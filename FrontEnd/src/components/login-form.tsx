import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate=useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  async function submitFun(event: React.FormEvent) {
    event.preventDefault(); // Prevent form from refreshing the page
    console.log("Hello");
    const username=usernameRef.current?.value;
    const email=emailRef.current?.value;
    const password=passwordRef.current?.value;

    const response=await axios({
      method:"post",
      url:BACKEND_URL+"signup",
      data:{
        username:username,
        email:email, 
        password:password
      }
    })
    console.log(response.data);
    navigate("/login");
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={submitFun} >
      <div className="flex flex-col items-center gap-2 text-center">
     {/* {error && <AlertDestructive desc={dec} />} */}
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to Create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input id="email" type="text" placeholder="" required ref={usernameRef}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required  ref={emailRef}/>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required ref={passwordRef}/>
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        
        
      </div>
      <div className="text-center text-sm">
        Already Have an Account? {" "}
        <span className="underline underline-offset-4 cursor-pointer" onClick={()=>{navigate("/login")}}> Login</span>
      </div>
    </form>
  )
}
