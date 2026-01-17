import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LuClock2 } from "react-icons/lu";

import {
  Avatar,
  Button,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { useGetNotificationsQuery, useReadAllNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { toast } from "sonner";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useSocket } from "../../../hooks/socketConnection";

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: notificationData, refetch } = useGetNotificationsQuery({});
  const [readAllNotification] = useReadAllNotificationMutation();
  const updateSearchParams = useUpdateSearchParams();
  const { page } = getSearchParams();
  const socket = useSocket(); // Initialize socket connection

  useEffect(() => {
    refetch();
  }, [page]);

  // Listen for new notifications via socket
  useEffect(() => {
    if (!socket) return;

    // Listen for notification events
    socket.on('notification', (data:any) => {
      console.log('New notification received:', data);
      toast.info(data.title || 'New notification received');
      refetch(); // Refetch notifications to update the list
    });

    socket.on('notificationRead', () => {
      console.log('Notification marked as read');
      refetch(); // Refetch to update read status
    });

    // Cleanup listeners
    return () => {
      socket.off('notification');
      socket.off('notificationRead');
    };
  }, [socket, refetch]);

  const handleMarkAllRead = async () => {
    try {
      const response = await readAllNotification();
      console.log("response", response);

      toast.success("Read All Notification");
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangePage = (__event: unknown, newPage: number) => {
    setCurrentPage(newPage);
    updateSearchParams({ page: newPage });
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6" fontWeight={600} color="white">
          All Notifications
        </Typography>

        <Button variant="contained" onClick={() => handleMarkAllRead()}>
          Mark all as read
        </Button>
      </Stack>

      {/* Notification List */}
      <Stack spacing={2}>
        {notificationData?.data?.result?.map((data: any) => (
          <Paper
            key={data._id}
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              background: data?.read ? 'var(--color-cardBg)' : "rgba(255,255,255,0.2)",
            }}
          >
            {/* LEFT CONTENT */}
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <NotificationsIcon />
              </Avatar>

              <Stack spacing={0.5}>
                <Typography
                  variant="subtitle1"
                  color="#ededed"
                  fontWeight={data?.read ? 500 : 700}
                >
                  {data.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="rgba(255,255,255, .5)"
                  fontWeight={400}
                >
                  {data.message}
                </Typography>
              </Stack>
            </Stack>

            {/* RIGHT — Date */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ minWidth: "fit-content" }}
            >
              <LuClock2 size={17} color="#7A7A7A" />
              <Typography variant="body2" color="white">
                {dayjs(data.createdAt ?? data.updatedAt).format("MMM D, YYYY • hh:mm A")}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Pagination */}
      <Stack alignItems="center" mt={4} color="white">
        <Pagination
          sx={{
            backgroundColor: "transparent",
            "& .MuiPaginationItem-text": {
              color: "rgba(255,255,255,.3)",
              border: "1px solid rgba(255,255,255,.3)",
            },
            "& .Mui-selected": {
              backgroundColor: "#F39C12 !important",
              color: "#000 !important",
              border: "1px solid #F39C12",
            },
            "& .MuiPaginationItem-previousNext": {
              color: "#F39C12",
              border: "1px solid #F39C12",
            },
            "& .MuiPaginationItem-previousNext:hover": {
              backgroundColor: "rgba(243,156,18,0.15)",
            },
          }}
          count={Math.ceil(notificationData?.meta?.total / notificationData?.meta?.limit)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Notifications;