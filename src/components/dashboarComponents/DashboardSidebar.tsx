import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  PlusCircle,
  Clock,
  CheckCircle,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

const DashboardSidebar = () => {
  const { user } = useAuthStore();

  return (
    <aside className="fixed  inset-y-0 left-0 w-56 bg-white border-r border-gray-200 hidden md:flex flex-col z-10">
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-goal-600 font-semibold">
            J
          </div>
          <div className="ml-3 text-start">
            <h3 className="font-medium text-goal-800">{user?.username}</h3>
            <p className="text-xs text-goal-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            path="/dashboard"
            active
          />
          <SidebarItem
            icon={<PlusCircle size={20} />}
            label="Create New Goal"
            path="/new-goal"
          />
        </ul>

        {/* Goal Categories */}
        <div className="mt-8">
          <h4 className="text-xs uppercase text-goal-400 font-semibold tracking-wider mb-3 px-3">
            Goal Categories
          </h4>
          <ul className="space-y-1">
            <SidebarItem
              icon={<Clock size={20} />}
              label="All Goals"
              path="/all-goals"
              badge="4"
            />
            <SidebarItem
              icon={<Clock size={20} />}
              label="Active Goals"
              path="/active-goals"
              badge="3"
            />
            <SidebarItem
              icon={<CheckCircle size={20} />}
              label="Completed"
              path="/completed-goals"
              badge="1"
            />
          </ul>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-1">
          <SidebarItem
            icon={<User size={20} />}
            label="Profile"
            path="/profile"
          />
          <SidebarItem
            icon={<LogOut size={20} className="text-red-500" />}
            label="Logout"
            path="/"
            className="text-red-500 hover:bg-red-50 hover:text-red-700"
          />
        </ul>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: string;
  active?: boolean;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  badge,
  active = false,
  className,
}) => {
  const { SignOut } = useAuthStore();
  const onLogout = () => {
    if (label.toLowerCase() === "logout") {
      SignOut();
      console.log("Hi")
    }
  };
  return (
    <li>
      <Link
        to={path}
        className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
          active
            ? "bg-goal-50 text-goal-700"
            : "text-goal-600 hover:bg-goal-50 hover:text-goal-700",
          className,
        )}
        onClick={onLogout}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
        {badge && (
          <span className="ml-auto bg-gray-200 text-goal-700 text-xs font-semibold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
};

export default DashboardSidebar;
