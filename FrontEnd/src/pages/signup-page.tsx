import { LoginForm } from "@/components/login-form"
import { useNavigate } from "react-router-dom"


export default function SignupPage() {
  const navigate=useNavigate();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a onClick={()=>{navigate("/")}} className="flex items-center gap-3 font-medium cursor-pointer">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <i className="ri-todo-line"></i>
            </div>
            <span className="cursor-pointer" onClick={()=>{navigate("/")}}> 10x ToDo</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
          
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="src\assets\vlcsnap-2023-09-14-20h35m09s186.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
