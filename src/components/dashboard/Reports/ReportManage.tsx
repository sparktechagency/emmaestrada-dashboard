import {
    Box,
    Button,
    Chip,
    InputAdornment,
    Pagination,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFlag, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { imageUrl } from "../../../redux/base/baseAPI";
import {
    useActionReportMutation,
    useDeleteReportMutation,
    useGetReportsQuery
} from "../../../redux/features/reports/reportsApi";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { FormatDate } from "../../shared/FormatDate";
import SharedInput from "../../shared/SharedInput";


const StyledHeadCell = styled(TableCell)(() => ({
    backgroundColor: "var(--color-primary)",
    color: "white",
    fontSize: 17,
    fontWeight: 600,
}));

const StyledRow = styled(TableRow)(() => ({
    "& td, & th": {
        paddingTop: 14,
        paddingBottom: 14,
    },
}));

const ReportManage = () => {
    const { page } = getSearchParams();
    //   @ts-ignore
    const [currentPage, setCurrentPage] = useState(Math.max(1, page || 1));
    const [searchText, setSearchText] = useState("");

    
    const updateSearchParams = useUpdateSearchParams();
    const { searchTerm } = getSearchParams();

    const { data: reportsData, refetch } = useGetReportsQuery({});
    const [deleteReport] = useDeleteReportMutation()
    const [actionReport] = useActionReportMutation()

    useEffect(() => {
        setSearchText(searchTerm);
        refetch();
    }, [searchTerm, refetch]);

    useEffect(() => {
        //   @ts-ignore
        const urlPage = Math.max(1, page || 1);
        setCurrentPage(urlPage);
        refetch();
    }, [page, refetch]);

    const handleSearch = (e: any) => {
        const search = e.target.value;
        setSearchText(search);
        updateSearchParams({ searchTerm: search });
    };

    const handleChangePage = (_?: any, newPage?: any) => {
        setCurrentPage(newPage);
        updateSearchParams({ page: newPage });
    };


    //   const handleDeleteReport = async () => {
    //     try {
    //       await deleteReport(selectedReport._id).unwrap();
    //       toast.success("Report deleted successfully");
    //       refetch();
    //       setSelectedReport(null);
    //       setOpenConfirmModal(false);
    //     } catch (error) {
    //       console.log("delete error", error);
    //       toast.error(error?.data?.message || "Failed to delete report");
    //     }
    //   };

    const getStatusColor = (status: any) => {
        switch (status) {
            case "pending":
                return { bg: "#FFF4E6", color: "#E65100" };
            case "reviewed":
                return { bg: "#E3F2FD", color: "#1565C0" };
            case "resolved":
                return { bg: "#E6F7E6", color: "#2E7D32" };
            default:
                return { bg: "#4a4d52", color: "#d5d7da" };
        }
    };

    const getReportStatusColor = (reportStatus: any) => {
        switch (reportStatus) {
            case "normal":
                return { bg: "#E6F7E6", color: "#2E7D32" };
            case "warning":
                return { bg: "#FFF4E6", color: "#E65100" };
            case "critical":
                return { bg: "#FFEBEE", color: "#C62828" };
            default:
                return { bg: "#4a4d52", color: "#d5d7da" };
        }
    };

    const handleToggleStatusPage = async (status: string, id: string, userName: string) => {
        const isBlocking = status === "blocked";

        const result = await Swal.fire({
            title: "Block User?",
            html: `Are you sure you want to block 
            <span class="text-primary font-semibold">${userName}</span>? 
            <br/>They will lose access to the platform.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: isBlocking ? "#d33" : "#28a745",
            cancelButtonColor: "#6c757d",
            confirmButtonText: isBlocking ? "Yes, block user" : "Yes, unblock user",
            cancelButtonText: "Cancel",
            background: "var(--color-cardBg)",
            color: "white",
        });

        if (result.isConfirmed) {
            try {
                await actionReport(id).unwrap();
                refetch();
                Swal.fire({
                    title: "Blocked!",
                    text: `${userName} has been blocked successfully.`,
                    icon: "success",
                    confirmButtonColor: "#F39C12",
                    background: "var(--color-cardBg)",
                    color: "white",
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    background: "var(--color-cardBg)",
                    color: "white",
                });
            }
        }
    };

    const handleRejectReport = async (id: string) => {
        try {
            const res = await deleteReport(id).unwrap();
            console.log("handleRejectReport", res);
            
            refetch();
            Swal.fire({
                title: "Blocked!",
                text: `Report has been Reject successfully.`,
                icon: "success",
                confirmButtonColor: "#F39C12",
                background: "var(--color-cardBg)",
                color: "white",
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
                background: "var(--color-cardBg)",
                color: "white",
            });
        }
    }

    return (
        <Box>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h5" fontWeight={600} color="white">
                        Reports Management
                    </Typography>
                    {reportsData?.meta?.total && (
                        <Chip
                            icon={<AlertTriangle size={16} />}
                            label={`${reportsData.meta.total} Reports`}
                            sx={{
                                backgroundColor: "#FF6B35",
                                color: "white",
                                fontWeight: 600,
                            }}
                        />
                    )}
                </Box>

                <Box display="flex" gap={2}>

                    <TextField
                        placeholder="Search by reporter, user..."
                        value={searchText}
                        onChange={handleSearch}
                        style={{ width: "325px" }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch />
                                </InputAdornment>
                            ),
                            style: {
                                borderRadius: "16px",
                            },
                        }}
                    />

                    <SharedInput width={350} onChange={handleSearch} placeholder="Searh by name, email" />
                </Box>
            </Box>

            <TableContainer component={Paper} className="bg-transparent!">
                <Table sx={{ minWidth: 650, background: "var(--color-cardBg)" }}>
                    <TableHead>
                        <StyledRow>
                            <StyledHeadCell>Reporter</StyledHeadCell>
                            <StyledHeadCell>Reported User</StyledHeadCell>
                            <StyledHeadCell>Campaign ID</StyledHeadCell>
                            <StyledHeadCell>Reason</StyledHeadCell>
                            <StyledHeadCell>Report Count</StyledHeadCell>
                            <StyledHeadCell>Date</StyledHeadCell>
                            <StyledHeadCell>Status</StyledHeadCell>
                            <StyledHeadCell>Priority</StyledHeadCell>
                            <StyledHeadCell>Actions</StyledHeadCell>
                        </StyledRow>
                    </TableHead>

                    <TableBody>
                        {reportsData?.data &&
                            reportsData?.data?.map((report: any, index: number) => {
                                const statusStyle = getStatusColor(report.status);
                                const reportStatusStyle = getReportStatusColor(report.reportStatus);

                                return (
                                    <StyledRow key={index}>
                                        {/* Reporter */}
                                        <TableCell sx={{ color: "white" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <img
                                                    src={`${imageUrl}${report.userId?.image || "/default-avatar.png"}`}
                                                    alt={report.userId?.name}
                                                    style={{
                                                        width: 45,
                                                        height: 45,
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <Box>
                                                    <p style={{ fontWeight: 600 }}>{report.userId?.name}</p>
                                                    <p style={{ fontSize: 13, opacity: 0.7 }}>
                                                        {report.userId?.email}
                                                    </p>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        {/* Reported User */}
                                        <TableCell sx={{ color: "white" }}>
                                            <Box>
                                                <p style={{ fontWeight: 600 }}>
                                                    {report.userReportId?.name || "N/A"}
                                                </p>
                                                {report.userReportId?.email && (
                                                    <p style={{ fontSize: 13, opacity: 0.7 }}>
                                                        {report.userReportId.email}
                                                    </p>
                                                )}
                                            </Box>
                                        </TableCell>

                                        {/* Campaign ID */}
                                        <TableCell sx={{ color: "white" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <FaFlag size={14} color="#ff6b35" />
                                                <span style={{ fontSize: 13, fontFamily: "monospace" }}>
                                                    {report.campaignId?.substring(0, 8)}...
                                                </span>
                                            </Box>
                                        </TableCell>

                                        {/* Reason */}
                                        <TableCell sx={{ color: "white", maxWidth: 200 }}>
                                            <p
                                                style={{
                                                    fontWeight: 500,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {report.reason}
                                            </p>
                                        </TableCell>

                                        {/* Report Count */}
                                        <TableCell sx={{ color: "white", textAlign: "center" }}>
                                            <Chip
                                                label={report.userReportCount}
                                                size="small"
                                                sx={{
                                                    backgroundColor: "rgba(255, 107, 53, 0.2)",
                                                    color: "#ff6b35",
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </TableCell>

                                        {/* Date */}
                                        <TableCell sx={{ color: "white" }}>
                                            {FormatDate(report.createdAt)}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            <span
                                                style={{
                                                    backgroundColor: statusStyle.bg,
                                                    color: statusStyle.color,
                                                    padding: "5px 15px",
                                                    borderRadius: 20,
                                                    fontWeight: 600,
                                                    fontSize: 13,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {report.status}
                                            </span>
                                        </TableCell>

                                        {/* Report Status (Priority) */}
                                        <TableCell>
                                            <span
                                                style={{
                                                    backgroundColor: reportStatusStyle.bg,
                                                    color: reportStatusStyle.color,

                                                    padding: "5px 15px",
                                                    borderRadius: 20,
                                                    fontWeight: 600,
                                                    fontSize: 13,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {report.reportStatus}
                                            </span>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 2,
                                                }}
                                            >
                                                <Button
                                                    disabled={report?.status === "resolved"}
                                                    variant="contained"
                                                    onClick={() => handleRejectReport(report?._id)}
                                                    sx={{
                                                        padding: "7px 25px",
                                                        borderRadius: 5,
                                                        fontWeight: 500,
                                                        fontSize: 13,
                                                        textTransform: "capitalize",
                                                        cursor: "pointer",
                                                        '&.Mui-disabled': {
                                                            backgroundColor: '#3a3a3a',
                                                            color: '#666666',
                                                            cursor: 'not-allowed'
                                                        }
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                                <Button
                                                    disabled={report?.status === "resolved"}
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleToggleStatusPage("blocked", report?._id, report?.userReportId?.name ?? report?.userReportId?.userName)}
                                                    sx={{
                                                        padding: "7px 25px",
                                                        borderRadius: 5,
                                                        fontWeight: 500,
                                                        fontSize: 13,
                                                        textTransform: "capitalize",
                                                        cursor: "pointer",
                                                        '&.Mui-disabled': {
                                                            backgroundColor: '#3a3a3a',
                                                            color: '#666666',
                                                            cursor: 'not-allowed'
                                                        }
                                                    }}
                                                >
                                                    Blocked
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </StyledRow>
                                );
                            })}
                    </TableBody>
                </Table>

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
                        count={Math.ceil(reportsData?.meta?.total / reportsData?.meta?.limit) || 1}
                        page={currentPage}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </Stack>
            </TableContainer>
        </Box >
    );
};

export default ReportManage;