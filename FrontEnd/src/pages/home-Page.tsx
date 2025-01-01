import { AnimatedBeamDemo } from "@/components/beam-component";
import { BorderBeam } from "@/components/ui/border-beam";
import Meteors from "@/components/ui/meteors";
import { useNavigate } from "react-router-dom";


export function Homepage() {
    const navigate=useNavigate();
  return (
    <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative overflow-hidden">
      {/* Navbar */}
      {/* <MeteorDemo/> */}
       <Meteors number={20} />
      <nav className="w-full flex items-center justify-between px-8 py-4 ">
        {/* Brand */}
        <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 dark:from-neutral-300 dark:to-neutral-500">
          100x ToDo
          <BorderBeam/>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-lg sm:text-xl">
          <span className="cursor-pointer font-bold text-neutral-700 dark:text-neutral-300 hover:text" onClick={()=>{
            navigate("/login")
          } }>
            Login
          </span>
          <span className="cursor-pointer font-bold text-neutral-700 dark:text-neutral-300" onClick={()=>{
            navigate("/signup")
          } }>
            Signup
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center ">
        <p className="text-6xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 mt-24 text-center">
          100x ToDo
          <AnimatedBeamDemo/>
        </p>
      </div>
    </div>
  );
}
