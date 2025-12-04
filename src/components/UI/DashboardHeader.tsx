import { BellOutlined } from "@ant-design/icons";

import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import { imageUrl } from "../../redux/base/baseAPI";
import { Avatar, Badge, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { data: profileData } = useGetProfileQuery(undefined);

  if (profileData) {
    console.log("profileData", profileData);
  }

  return (
    <div className="min-h-[80px] border-b border-gray-700 flex items-center justify-end pr-5  gap-5 shadow-md">
      <Link to="/notifications">
        <Badge color="secondary" showZero overlap="circular" badgeContent={0}>
          <BellOutlined style={{ fontSize: 28, color: "#ededed" }} />
        </Badge>
      </Link>

      <div className="flex items-center gap-3">
        <Link to="/settings">
          <Avatar
            // sx={{ width: 24, height: 24 }}
            sizes="large"
            alt="Remy Sharp"
            src={
              profileData?.profileImage
                ? `${imageUrl}${profileData?.profileImage}`
                : "/placeholder.png"
            }
          />
        </Link>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <p className="font-bold text-lg text-white">S S Md. Bayzid</p>
          <p className="text-slate-500 font-semibold">ssmd.bayzid@gmail.com</p>
        </Box>
      </div>
    </div>
  );
};

export default DashboardHeader;

// -----------------------------------------------------------
