
import { LoginForm2 } from "@/components/login-form-2"
import { NavigationHome } from "@/components/navbar-2"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center p-6 sm:p-0 flex flex-col">
      {/* <NavigationHome/> */}
      <div className="w-full max-w-sm">
        <LoginForm2 />
      </div>
    </div>
  )
}
