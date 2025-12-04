import { useState } from "react";
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

const limit = 10;

// 🔥 Demo Notification Data
const demoNotifications = [
  {
    _id: "1",
    title: "New Order Received",
    message: "You have received a new order from John Doe.",
    date: "2025-11-12T21:10:00.000Z",
    isRead: false,
  },
  {
    _id: "2",
    title: "Payment Successful",
    message: "Your payment for invoice #534 has been completed.",
    date: "2025-11-10T12:45:00.000Z",
    isRead: true,
  },
  {
    _id: "3",
    title: "New Message",
    message: "You received a message from Admin.",
    date: "2025-11-11T09:20:00.000Z",
    isRead: false,
  },
  {
    _id: "4",
    title: "System Update",
    message: "System will be updated tonight at 2 AM.",
    date: "2025-11-13T05:00:00.000Z",
    isRead: true,
  },
  {
    _id: "5",
    title: "Subscription Renewed",
    message: "Your subscription has been renewed successfully.",
    date: "2025-11-14T08:15:00.000Z",
    isRead: false,
  },
  {
    _id: "6",
    title: "Review Reminder",
    message: "Don’t forget to review the recent purchase.",
    date: "2025-11-15T13:10:00.000Z",
    isRead: true,
  },
  {
    _id: "7",
    title: "New Blog Post",
    message: "A new blog post has been published.",
    date: "2025-11-16T10:30:00.000Z",
    isRead: false,
  },
  {
    _id: "8",
    title: "Support Ticket",
    message: "Your support ticket has been updated.",
    date: "2025-11-17T16:40:00.000Z",
    isRead: false,
  },
  {
    _id: "9",
    title: "Referral Bonus",
    message: "You received a new referral bonus.",
    date: "2025-11-18T09:05:00.000Z",
    isRead: true,
  },
  {
    _id: "10",
    title: "Security Alert",
    message: "New login detected from Chrome browser.",
    date: "2025-11-18T19:20:00.000Z",
    isRead: false,
  },
];

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState(demoNotifications);

  const paginatedData = notifications.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
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
        <Typography variant="h6" fontWeight={600}>
          All Notifications
        </Typography>

        <Button variant="contained" onClick={handleMarkAllRead}>
          Mark all as read
        </Button>
      </Stack>

      {/* Notification List */}
      <Stack spacing={2}>
        {paginatedData.map((data) => (
          <Paper
            key={data._id}
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              background: 'var(--color-cardBg)',              
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
                  fontWeight={data.isRead ? 500 : 700}
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
                {dayjs(data.date).format("MMM D, YYYY • hh:mm A")}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Pagination */}
      <Stack alignItems="center" mt={4}>
        <Pagination
          count={Math.ceil(notifications.length / limit)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Notifications;
