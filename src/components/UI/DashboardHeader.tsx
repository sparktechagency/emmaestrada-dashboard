import { BellOutlined } from "@ant-design/icons";

import { Avatar, Badge, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { imageUrl } from "../../redux/base/baseAPI";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import { useNotificationCountQuery } from "../../redux/features/notification/notificationApi";
import { useSocket } from "../../hooks/socketConnection";
import { useEffect } from "react";
import { toast } from "sonner";

const DashboardHeader = () => {
  const { data: profileData } = useGetProfileQuery(undefined);
  const { data: totalUnreadCount, refetch } = useNotificationCountQuery({});

  const socket = useSocket()

  useEffect(() => {
    if (!socket) return;
    
    socket.on(`notification::${profileData?._id}`, data => {
      console.log('New notification received:', data);
      toast.info(data.title || 'New notification received');
      refetch();
    });

    socket.on(`unreadCountUpdate::${profileData?._id}`, () => {      
      toast.info('New notification received');
      refetch();
    });

    return ()=>{
      socket.off(`notification::${profileData?._id}`);
      socket.off(`unreadCountUpdate::${profileData?._id}`);
    }
  }, [])


  return (
    <div className="min-h-[80px] border-b border-gray-700 flex items-center justify-end pr-5  gap-5 shadow-md">
      <Link to="/notifications">
        <Badge color="error" showZero overlap="circular" badgeContent={totalUnreadCount ?? 0}>
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
              profileData?.image
                ? `${imageUrl}${profileData?.image}`
                : "/placeholder.png"
            }
          />
        </Link>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <p className="font-bold text-lg text-white">{profileData?.name ?? "N/A"}</p>
          <p className="text-slate-500 font-semibold">{profileData?.email ?? "N/A"}</p>
        </Box>
      </div>
    </div>
  );
};

export default DashboardHeader;

// -----------------------------------------------------------
