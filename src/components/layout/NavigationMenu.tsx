
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Home, Calendar, BarChart, BookOpen, Plus } from "lucide-react";

interface NavigationMenuProps {
  vertical?: boolean;
}

export const NavigationMenu = ({ vertical = false }: NavigationMenuProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "faculty";

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Themes & Programs",
      path: "/themes",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "Statistics",
      path: "/statistics",
      icon: <BarChart className="h-4 w-4" />,
    },
  ];

  if (isAdmin) {
    navigationItems.push({
      name: "Add Event",
      path: "/add-event",
      icon: <Plus className="h-4 w-4" />,
    });
  }

  return (
    <nav className={cn("flex", vertical ? "flex-col space-y-1" : "space-x-1")}>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            location.pathname === item.path
              ? "bg-primary/10 text-primary"
              : "text-gray-600 hover:bg-gray-100",
            vertical ? "w-full" : ""
          )}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};
