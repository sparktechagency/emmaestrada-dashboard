import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../UI/DashboardHeader";
import Sidebar from "./Sidebar";
import React from "react";

const MainLayout: React.FC = () => {
  

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "var(--color-black)", }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // takes remaining width
          transition: "margin-left 0.3s ease",
          // match your sidebar width
          display: "flex",
          flexDirection: "column",
          

        }}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Page content */}
        <Box sx={{ flexGrow: 1, p: 2, marginLeft: "10px", overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
