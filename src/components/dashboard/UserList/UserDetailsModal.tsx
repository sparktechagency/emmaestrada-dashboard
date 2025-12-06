import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  Paper,
  Dialog,
} from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";



const UserDetailsModal = ({ open, data, onClose }: any) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="bg-black/70 "
      PaperProps={{
        sx: {
          // background: "#0E1117",
          background: "#121212",
          color: "white",
          border: "1px solid rgba(207,151,2,0.7)",
          borderRadius: 3,
          padding: 3,
        },
      }}
    >      
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            User Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Profile Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={data?.profileImage}
            alt={data?.name}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {data?.name}
            </Typography>

            {/* Role Badge */}
            <Chip
              label={data?.role}
              size="small"
              sx={{
                mt: 1,
                background:
                  data?.role?.toLowerCase() === "artist"
                    ? "#FDE6FF"
                    : "#E8F5FF",
                color:
                  data?.role?.toLowerCase() === "artist"
                    ? "#C900C9"
                    : "#0066C9",
                fontWeight: 600,
              }}
            />

            {/* Verified Status */}
            <Chip
              label={data?.status}
              size="small"
              sx={{
                ml: 1,
                mt: 1,
                background:
                  data?.status?.toLowerCase() === "active"
                    ? "#E5F8EA"
                    : "#FFE5E5",
                color:
                  data?.status?.toLowerCase() === "active"
                    ? "#0B8A26"
                    : "#D10E0E",
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        {/* User Info */}
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="gray">Email</Typography>
            <Typography fontWeight={500}>{data?.email}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography color="gray">Join Date</Typography>
            <Typography fontWeight={500}>
              {dayjs(data?.joinDate).format("DD MMMM, YYYY")}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography color="gray">Phone</Typography>
            <Typography fontWeight={500}>{data?.phone ?? "—"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography color="gray">Location</Typography>
            <Typography fontWeight={500}>{data?.location ?? "—"}</Typography>
          </Grid>

          {data?.role?.toLowerCase() === "artist" && (
            <Grid item xs={12} sm={6}>
              <Typography color="gray">Followers</Typography>
              <Typography fontWeight={700} color="primary">
                {data?.followers}
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Social Media */}
        <Typography mt={4} fontWeight={600}>
          Social Media
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={4}>
            <Typography color="gray">Instagram</Typography>
            <Typography fontWeight={500}>{data?.instagram ?? "—"}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography color="gray">Tiktok</Typography>
            <Typography fontWeight={500}>{data?.tiktok ?? "—"}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography color="gray">YouTube</Typography>
            <Typography fontWeight={500}>{data?.youtube ?? "—"}</Typography>
          </Grid>
        </Grid>

        {/* Artist Bio */}
        {data?.bio && (
          <>
            <Typography mt={4} fontWeight={600}>
              Artist Bio
            </Typography>

            <Box
              sx={{
                background: "rgba(255,255,255,0.05)",
                p: 2,
                borderRadius: 2,
                mt: 1,
                fontSize: "14px",
              }}
            >
              {data?.bio}
            </Box>
          </>
        )}      
    </Dialog>

  );
};

export default UserDetailsModal;




