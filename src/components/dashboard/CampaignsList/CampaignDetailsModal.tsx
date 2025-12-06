import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Divider,
  Avatar,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CalendarMonth, Groups, AttachMoney, GridView } from "@mui/icons-material";


const CampaignDetailsModal = ({ open, onClose, data }: any) => {
    if (!data) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            className="bg-black/70 "
            PaperProps={{
                sx: {                    
                    background: "#121212",
                    color: "white",
                    border: "1px solid rgba(207,151,2,0.7)",
                    borderRadius: 3,
                },
            }}
        >
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <DialogTitle sx={{ fontSize: 22, fontWeight: 700, color: "var(--color-primary)" }}>
                    Campaign Details
                </DialogTitle>
                <IconButton onClick={onClose}>
                    <Close sx={{ color: "white" }} />
                </IconButton>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

            <DialogContent sx={{ p: 3 }}>
                {/* Thumbnail */}
                <Box
                    sx={{
                        width: "100%",
                        height: 200,
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)",
                        mb: 4,
                    }}
                >
                    <img
                        src={data.thumbnail}
                        alt="thumbnail"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Box>

                {/* Campaign Info */}
                <Typography variant="h6" sx={{ color: "var(--color-primary)", mb: 2 }}>
                    Basic Information
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography color="gray.300">Campaign Name</Typography>
                        <Typography fontWeight={600}>{data.name}</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography color="gray.300">Platforms</Typography>
                        <Box display="flex" gap={1} mt={1}>
                            {data.platforms?.map((p: string, i: number) => (
                                <img
                                    key={i}
                                    src={`/${p}.png`}
                                    alt={p}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        background: "rgba(255,255,255,0.2)",
                                        padding: 4,
                                        borderRadius: 6,
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography color="gray.300">Duration</Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                            <CalendarMonth sx={{ fontSize: 18, color: "#CF9702" }} />
                            <Typography>
                                {data.start} → {data.end}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography color="gray.300">Status</Typography>
                        <Chip
                            label={data.status}
                            sx={{
                                mt: 1,
                                background: data.status === "Active" ? "#E6F7E6" : "#FFE6E6",
                                color: data.status === "Active" ? "#2E7D32" : "#D32F2F",
                                fontWeight: 600,
                            }}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Owner */}
                <Typography variant="h6" sx={{ color: "var(--color-primary)", mb: 2 }}>
                    Campaign Owner
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                        src={data.ownerPic}
                        sx={{ width: 60, height: 60, border: "2px solid rgba(255,255,255,0.2)" }}
                    />

                    <Box>
                        <Typography fontWeight={700}>{data.owner}</Typography>
                        <Typography color="gray.400">@{data.username}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Budget & influencers */}
                <Typography variant="h6" sx={{ color: "var(--color-primary)", mb: 2 }}>
                    Performance & Budget
                </Typography>

                <Grid container spacing={3}>
                    <Grid item size={{ xs: 6, md: 4 }}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <AttachMoney sx={{ color: "var(--color-primary)", mb: 1 }} />
                            <Typography color="gray.300">Budget</Typography>
                            <Typography fontWeight={700} fontSize={18}>
                                ${data.budget}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item size={{ xs: 6, md: 4 }}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <Groups sx={{ color: "var(--color-primary)", mb: 1 }} />
                            <Typography color="gray.300">Influencers</Typography>
                            <Typography fontWeight={700} fontSize={18}>
                                {data.usedInfluencers}/{data.totalInfluencers}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item size={{ xs: 6, md: 4 }}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <GridView sx={{ color: "var(--color-primary)", mb: 1 }} />
                            <Typography color="gray.300">Platforms Used</Typography>
                            <Typography fontWeight={700} fontSize={18}>
                                {data.platforms?.length}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ p: 2 }}>
                <Button variant="outlined" onClick={onClose} sx={{ borderColor: "#CF9702", color: "#CF9702" }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CampaignDetailsModal;

