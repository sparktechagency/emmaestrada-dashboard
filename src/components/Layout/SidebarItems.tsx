import { Music } from "lucide-react";
import { FaStore } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export const navItems: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: <MdOutlineDashboard /> },
  {
    to: "/users",
    label: "Users",
    icon: <FaStore />,
  },
  {
    to: "/campaigns-list",
    label: "Campaigns List",
    icon: <Music />
  },
  {
    to: "/all-admin",
    label: "Admin",
    icon: <LuNotepadText />,
  },
  { to: "/settings", label: "Settings", icon: <IoSettingsOutline /> },
];
