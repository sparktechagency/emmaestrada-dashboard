import { FaStore } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
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
    to: "/content-manage",
    label: "Movie & Series",
    icon: <FaStore />,
  },
 
  {
    to: "/genres",
    label: "Genres",
    icon: <GrTransaction />,
  },   
    {
    to: "/all-admin",
    label: "Admin",
    icon: <LuNotepadText />,
  },  
  { to: "/settings", label: "Settings", icon: <IoSettingsOutline /> },
];
