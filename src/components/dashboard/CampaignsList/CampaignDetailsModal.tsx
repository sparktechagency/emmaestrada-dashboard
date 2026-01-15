import { AttachMoney, CalendarMonth, Close } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { imageUrl } from "../../../redux/base/baseAPI";


const CampaignDetailsModal = ({ open, onClose, data }: any) => {
    if (!data) return null;

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return { bg: '#E6F7E6', color: '#2E7D32' };
            case 'inactive':
                return { bg: '#FFE6E6', color: '#D32F2F' };
            case 'completed':
                return { bg: '#E3F2FD', color: '#1976D2' };
            default:
                return { bg: '#F5F5F5', color: '#616161' };
        }
    };

    const statusColors = getStatusColor(data.status);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            className="bg-black/70"
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
                        src={data.thumbnail ? `${imageUrl}${data.thumbnail}` : '/campaign-img.png'}
                        alt="thumbnail"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e: any) => {
                            e.target.src = '/campaign-img.png';
                        }}
                    />
                </Box>

                {/* Campaign Info */}
                <Typography variant="h6" sx={{ color: "var(--color-primary)", mb: 2 }}>
                    Basic Information
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Campaign Title</Typography>
                        <Typography fontWeight={600}>{data.title || 'N/A'}</Typography>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Content Type</Typography>
                        <Typography fontWeight={600}>{data.contentType || 'N/A'}</Typography>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Category</Typography>
                        <Typography fontWeight={600}>{data.category || 'N/A'}</Typography>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Genre</Typography>
                        <Typography fontWeight={600}>{data.genre || 'N/A'}</Typography>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Platforms</Typography>
                        <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                            {data.platforms?.map((p: string, i: number) => (
                                <img
                                    key={i}
                                    src={`/${p.toLowerCase()}.png`}
                                    alt={p}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        background: "rgba(255,255,255,0.2)",
                                        padding: 4,
                                        borderRadius: 6,
                                    }}
                                    onError={(e: any) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Created Date</Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                            <CalendarMonth sx={{ fontSize: 18, color: "#CF9702" }} />
                            <Typography>{formatDate(data.createdAt)}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Status</Typography>
                        <Chip
                            label={data.status}
                            sx={{
                                mt: 1,
                                background: statusColors.bg,
                                color: statusColors.color,
                                fontWeight: 600,
                                textTransform: 'capitalize'
                            }}
                        />
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300">Active Status</Typography>
                        <Chip
                            label={data.isActive ? 'Active' : 'Inactive'}
                            sx={{
                                mt: 1,
                                background: data.isActive ? '#E6F7E6' : '#FFE6E6',
                                color: data.isActive ? '#2E7D32' : '#D32F2F',
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
                        src={data.userId?.image ? `${imageUrl}${data.userId.image}` : '/profile14.jpg'}
                        sx={{ width: 60, height: 60, border: "2px solid rgba(255,255,255,0.2)" }}
                    />
                    <Box>
                        <Typography fontWeight={700}>{data.userId?.name || 'Unknown'}</Typography>
                        <Typography color="gray.400">@{data.userId?.userName || 'N/A'}</Typography>
                        <Typography color="gray.500" fontSize={12}>{data.userId?.email || 'N/A'}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Budget & Payment */}
                <Typography variant="h6" sx={{ color: "var(--color-primary)", mb: 2 }}>
                    Budget & Payment Information
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 6}}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <AttachMoney sx={{ color: "var(--color-primary)", mb: 1 }} />
                            <Typography color="gray.300">Campaign Amount</Typography>
                            <Typography fontWeight={700} fontSize={18}>
                                ${data.campaignAmount || 0}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <AttachMoney sx={{ color: "#4CAF50", mb: 1 }} />
                            <Typography color="gray.300">Paid Amount</Typography>
                            <Typography fontWeight={700} fontSize={18}>
                                ${data.paidAmount || 0}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <AttachMoney sx={{ color: "#FF9800", mb: 1 }} />
                            <Typography color="gray.300">Remaining</Typography>
                            <Typography fontWeight={700} fontSize={18}>
                                ${data.remainingAmount || 0}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <Typography color="gray.300">Platform Fee</Typography>
                            <Typography fontWeight={700} fontSize={18}>
                                {data.platformFee}%
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>
                        <Box
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <Typography color="gray.300">Payment Status</Typography>
                            <Chip
                                label={data.paymentStatus || 'pending'}
                                sx={{
                                    mt: 1,
                                    background: data.isPaid ? '#E6F7E6' : '#FFF3E0',
                                    color: data.isPaid ? '#2E7D32' : '#F57C00',
                                    fontWeight: 600,
                                    textTransform: 'capitalize'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                {/* Budget Details */}
                <Typography variant="h6" sx={{ color: "var(--color-primary)", mb: 2 }}>
                    Reward Structure
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300" fontSize={12}>Reward Rate</Typography>
                        <Typography fontWeight={600}>{data.budget?.rewardRate || 0}%</Typography>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300" fontSize={12}>Per Views</Typography>
                        <Typography fontWeight={600}>{data.budget?.perViews || 0}</Typography>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300" fontSize={12}>Min Payout</Typography>
                        <Typography fontWeight={600}>${data.budget?.minPayout || 0}</Typography>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300" fontSize={12}>Max Payout</Typography>
                        <Typography fontWeight={600}>${data.budget?.maxPayout || 0}</Typography>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <Typography color="gray.300" fontSize={12}>Flat Price</Typography>
                        <Typography fontWeight={600}>${data.budget?.flatPrice || 0}</Typography>
                    </Grid>
                </Grid>

                {/* Assets */}
                {data.assets?.availableContentLink && (
                    <>
                        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
                        <Typography variant="h6" sx={{ color: "var(--color-primary)", mb: 2 }}>
                            Assets
                        </Typography>
                        <Typography color="gray.300" fontSize={12}>Content Link</Typography>
                        <Typography 
                            fontWeight={600} 
                            sx={{ 
                                wordBreak: 'break-all',
                                color: '#64B5F6',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                            onClick={() => window.open(data.assets.availableContentLink, '_blank')}
                        >
                            {data.assets.availableContentLink}
                        </Typography>
                    </>
                )}
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ p: 2 }}>
                <Button 
                    variant="outlined" 
                    onClick={onClose} 
                    sx={{ borderColor: "#CF9702", color: "#CF9702" }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CampaignDetailsModal;