// CampaignsList.tsx
import {
    Box,
    Pagination,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import CampaignDetailsModal from "../CampaignsList/CampaignDetailsModal";
import { useGetCampaignsQuery } from "../../../redux/features/campaigns/campaignsApi";
import { imageUrl } from "../../../redux/base/baseAPI";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";

const StyledHeadCell = styled(TableCell)(() => ({
    backgroundColor: "var(--color-primary)",
    color: "white",
    fontSize: 17,
    fontWeight: 600,
}));

const CampaignsList = () => {
    const { data: campaignsData, isLoading, refetch } = useGetCampaignsQuery({})
    const { page } = getSearchParams();
    const updateSearchParams = useUpdateSearchParams();

    // @ts-ignore    
    const [currentPage, setCurrentPage] = useState(Math.max(0, (page || 1)));


    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);


    useEffect(() => {
            // @ts-ignore
    const urlPage = Math.max(1, page || 1);
    setCurrentPage(urlPage);
        refetch();
    }, [page, refetch])


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

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, color: 'white' }}>
                Loading campaigns...
            </Box>
        );
    }

    const handleChangePage = (_event: unknown, newPage: number) => {
        // Convert 0-based MUI page to 1-based API page
        const apiPage = newPage;
        setCurrentPage(newPage);
        updateSearchParams({ page: apiPage });
    };

    return (
        <TableContainer component={Paper} className="bg-transparent!">
            <Table sx={{ minWidth: 650, background: "var(--color-cardBg)" }}>
                <TableHead>
                    <TableRow>
                        <StyledHeadCell>Campaign</StyledHeadCell>
                        <StyledHeadCell>Category/Genre</StyledHeadCell>
                        <StyledHeadCell>Owner</StyledHeadCell>
                        <StyledHeadCell>Budget</StyledHeadCell>
                        <StyledHeadCell>Platforms</StyledHeadCell>
                        <StyledHeadCell>Content Type</StyledHeadCell>
                        <StyledHeadCell>Status</StyledHeadCell>
                        <StyledHeadCell>Action </StyledHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {campaignsData?.data && campaignsData?.data?.map((row: any, i: number) => {
                        const statusColors = getStatusColor(row?.status);
                        return (
                            <TableRow key={row?._id || i}>
                                {/* CAMPAIGN CARD PREVIEW */}
                                <TableCell>
                                    <Box
                                        sx={{
                                            width: 150,
                                            height: 85,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={row?.thumbnail ? `${imageUrl}${row.thumbnail}` : '/campaign-img.png'}
                                            alt={row?.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            onError={(e: any) => {
                                                e.target.src = '/campaign-img.png';
                                            }}
                                        />
                                    </Box>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            marginTop: 6,
                                            color: "white",
                                        }}
                                    >
                                        {row?.title || 'Untitled Campaign'}
                                    </div>
                                </TableCell>

                                {/* Category/Genre */}
                                <TableCell sx={{ color: "white" }}>
                                    <div style={{ fontWeight: 600 }}>{row?.category || 'N/A'}</div>
                                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                                        {row?.genre || 'N/A'}
                                    </div>
                                </TableCell>

                                {/* OWNER */}
                                <TableCell sx={{ color: "white" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={row?.userId?.image ? `${imageUrl}${row.userId.image}` : '/profile14.jpg'}
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                            onError={(e: any) => {
                                                e.target.src = '/profile14.jpg';
                                            }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 600 }}>
                                                {row?.userId?.name || 'Unknown'}
                                            </div>
                                            <div style={{ fontSize: 12, opacity: 0.7 }}>
                                                @{row?.userId?.userName || 'N/A'}
                                            </div>
                                        </div>
                                    </Box>
                                </TableCell>

                                {/* BUDGET */}
                                <TableCell sx={{ color: "white" }}>
                                    <div style={{ fontWeight: 600 }}>
                                        ${row?.campaignAmount || 0}
                                    </div>
                                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                                        Paid: ${row?.paidAmount || 0}
                                    </div>
                                </TableCell>

                                {/* Platforms */}
                                <TableCell sx={{ color: "white" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                        {row?.platforms?.map((platform: string, index: number) => (
                                            <img
                                                key={index}
                                                src={`/${platform.toLowerCase()}.png`}
                                                alt={platform}
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    background: "rgba(255,255,255,0.3)",
                                                    borderRadius: 4,
                                                    padding: 2
                                                }}
                                                onError={(e: any) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>

                                {/* Content Type */}
                                <TableCell sx={{ color: "white" }}>
                                    {row?.contentType || 'N/A'}
                                </TableCell>

                                {/* STATUS */}
                                <TableCell>
                                    <span
                                        style={{
                                            backgroundColor: statusColors.bg,
                                            color: statusColors.color,
                                            padding: "5px 12px",
                                            borderRadius: 20,
                                            fontWeight: 600,
                                            fontSize: 13,
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {row?.status || 'Unknown'}
                                    </span>
                                </TableCell>

                                {/* ACTION ICONS */}
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1.5,
                                        }}
                                    >
                                        <IoEyeOutline
                                            size={18}
                                            className="text-blue-400 cursor-pointer"
                                            onClick={() => {
                                                setSelectedCampaign(row);
                                                setOpenDetails(true);
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {campaignsData?.data?.length === 0 && !isLoading && (
                <Box sx={{ textAlign: 'center', p: 4, color: 'white' }}>
                    No campaigns found
                </Box>
            )}

            <Stack alignItems="center" mt={4} color="white" pb={2}>
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
                    count={Math.ceil(campaignsData?.meta?.total / campaignsData?.meta?.limit)}

                    page={currentPage}
                    onChange={handleChangePage}
                />
            </Stack>

            <CampaignDetailsModal
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                data={selectedCampaign}
            />
        </TableContainer>
    );
};

export default CampaignsList;