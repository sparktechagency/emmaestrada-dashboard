import { Copy, DollarSign, Images, Music } from "lucide-react";
import { FaStore } from "react-icons/fa";
import { IoHelpBuoyOutline, IoSettingsOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineDashboard, MdOutlineReport } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";

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
    to: "/category-manage",
    label: "Category Manage",
    icon: <Copy />
  },
  {
    to: "/planner-manage",
    label: "Planner Manage",
    icon: <IoHelpBuoyOutline />
  },
  {
    to: "/withdraw-manage",
    label: "WIthdraw Manage",
    icon: <BiMoneyWithdraw />
  },
  {
    to: "/sliders-manage",
    label: "Slider Manage",
    icon: <Images />
  },
  {
    to: "/commission-manage",
    label: "Commission Manage",
    icon: <DollarSign />
  },
  {
    to: "/report-manage",
    label: "Reports",
    icon: <MdOutlineReport />
  },
  {
    to: "/all-admin",
    label: "Admin",
    icon: <LuNotepadText />,
  },
  { to: "/settings", label: "Settings", icon: <IoSettingsOutline /> },
];
