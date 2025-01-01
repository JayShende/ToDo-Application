import { Home, Settings } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { useNavigate } from "react-router-dom";

function DefaultDemo() {
  const navigate = useNavigate(); // Use the navigation hook

  const tabs = [
    { title: "Dashboard", icon: Home },
    { type: "separator" },
    { title: "Settings", icon: Settings },
    
  ];

  const handleTabChange = (index) => {
    // Map tab index to corresponding routes
    const routes = ["/dashboard", null, "/settings"];
    const route = routes[index];
    if (route) {
      navigate(route); // Navigate to the specified route
    }
  };

  return (
    <div className="flex gap-4">
      <ExpandableTabs tabs={tabs} onChange={handleTabChange} />
    </div>
  );
}

export { DefaultDemo };
