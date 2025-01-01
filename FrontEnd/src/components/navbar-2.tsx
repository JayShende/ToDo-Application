import { Home, CircleUser,KeyRound } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { ExpandableTabs } from "./ui/expandable-tabs";
import { DarkModeToggleCheckboxDemo } from "./theme-toggle";

function NavigationHome() {
  const navigate = useNavigate(); // Use the navigation hook

  const tabs = [
    { title: "Home", icon: Home },
    { type: "separator" },
    { title: "Signup", icon: CircleUser },
    { title: "Login", icon: KeyRound },
    
  ];

  const handleTabChange = (index) => {
    // Map tab index to corresponding routes
    const routes = ["/", null, "/settings"];
    const route = routes[index];
    if (route) {
      navigate(route); // Navigate to the specified route
    }
  };

  return (
    <div className="flex gap-4 mx-5 my-10 flex justify-center ">
      <ExpandableTabs tabs={tabs}  />
      <DarkModeToggleCheckboxDemo/>
    </div>
  );
}

export { NavigationHome };
