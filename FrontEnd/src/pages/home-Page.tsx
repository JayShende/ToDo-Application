import { AnimatedBeamDemo } from "@/components/beam-component";
import { NavigationHome} from "@/components/navbar-2";
import { DarkModeToggleCheckboxDemo } from "@/components/theme-toggle";
import { BorderBeam } from "@/components/ui/border-beam";
import Meteors from "@/components/ui/meteors";
import { useNavigate } from "react-router-dom";

export function Homepage() {
  return (
    <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative overflow-hidden">
      {/* Navbar */}
      {/* <MeteorDemo/> */}
      <Meteors number={20} />
      <NavigationHome/>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center sm:mt-0 mt-32">
        <p className="text-6xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 sm:mt-24 mt-2 text-center">
          100x ToDo
        </p>
        <AnimatedBeamDemo />
      </div>
      <BorderBeam/>
    </div>
  );
}
