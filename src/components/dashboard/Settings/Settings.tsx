"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import About from "./About";
import { ChangePassword } from "./ChangePassword";
import FAQ from "./FAQ";
import PersonalInformation from "./PersonalInformation";
import TermsCondition from "./TermsCondition";

// --- Placeholder for react-icons/lucide-react, using inline SVG instead ---
// Icon component for the list items
const ChevronRightIcon = (props:any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// Mock data for the settings list
const settingsItems = [
  { name: "Personal Information", key: "personal", icon: null },
  { name: "Change Password", key: "password", icon: null },
  { name: "Terms & Condition", key: "terms", icon: null },
  { name: "About Us", key: "about", icon: null },
  { name: "FAQ", key: "faq", icon: null },
];

/**
 * Renders the main content area for the Settings page.
 * Skips the header and sidebar as requested.
 */
const SettingsPageContent = ({
  items,
  selectedKey,
  handleSelect,
}: {
  items: any;
  selectedKey: string;
  handleSelect: any;
}) => {
  // State to manage the currently selected setting item (for visual feedback)

  return (
    <Box className="max-w-2xl">
      <List
        disablePadding
        className="bg-cardBg rounded-xl shadow-xl divide-y divide-gray-100"
      >
        {items?.map((item: any) => (
          <React.Fragment key={item.key}>
            <ListItemButton
              onClick={() => handleSelect(item.key)}
              selected={selectedKey === item.key}
              className={`
                  py-4 px-6 
                  hover:bg-gray-50 transition-colors duration-200
                  ${
                    selectedKey === item.key
                      ? "bg-blue-50/50 border-l-4 border-blue-600"
                      : ""
                  }
                `}

              // Style the selected state to match the image's light blue background
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 245, 255)",
                  borderLeft: "4px solid var(--color-secondary)",
                  "&:hover": {
                    backgroundColor: "rgba(235, 245, 255, 0.7)",
                  },
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    className="!font-medium !text-lg"
                    sx={{
                      color: selectedKey === item.key ? "#1976d2" : "var(--color-secondary)",
                    }} // Match text color to selected state
                  >
                    {item.name}
                  </Typography>
                }
              />
              <ListItemIcon className="min-w-0">
                <ChevronRightIcon className="text-gray-400" />
              </ListItemIcon>
            </ListItemButton>
            {/* Optional: Divider between items, though the image implies a line style achieved by the main List */}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

const Settings = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [open, setOpen] = useState(false);

  const handleItemClick = (key: string) => {
    setSelectedKey(key);
    setOpen(true);
    console.log(`Navigating to ${key} settings...`);
  };

  return (
    // We use a Box to simulate the main content background
    <Box className=" h-full">
      {open ? <Box className="">
        <h1 onClick={()=>setOpen(!open)} className="cursor-pointer text-lg font-medium mb-5 text-white/70"><span><ArrowLeftOutlined /> </span> Back</h1>

        {selectedKey == "personal" ? (
          <PersonalInformation />
        ) : selectedKey == "password" ? (
          <ChangePassword />
        ) : selectedKey == "terms" ? (
          <TermsCondition />
        ) : selectedKey == "about" ? (
          <About />
        ) : selectedKey == "faq" ? (
          <FAQ />
        ) : (
          ""
        )}
      </Box> :
      <SettingsPageContent
        items={settingsItems}
        selectedKey={selectedKey}
        handleSelect={handleItemClick}
      />
      }
      
    </Box>
  );
};

export default Settings;
