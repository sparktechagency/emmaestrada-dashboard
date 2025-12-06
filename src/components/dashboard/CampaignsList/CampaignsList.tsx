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
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import CampaignDetailsModal from "../CampaignsList/CampaignDetailsModal";

const StyledHeadCell = styled(TableCell)({
    backgroundColor: "#CF9702",
    color: "white",
    fontSize: 17,
    fontWeight: 600,
});

const CampaignsList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);

    return (
        <TableContainer component={Paper} className="bg-transparent!">
            <Table sx={{ minWidth: 650, background: "var(--color-cardBg)" }}>
                <TableHead>
                    <TableRow>
                        <StyledHeadCell>Campaign</StyledHeadCell>
                        <StyledHeadCell>Platforms</StyledHeadCell>
                        <StyledHeadCell>Influencers</StyledHeadCell>
                        <StyledHeadCell>Budget</StyledHeadCell>
                        <StyledHeadCell>Influencers</StyledHeadCell>
                        <StyledHeadCell>Duration</StyledHeadCell>
                        <StyledHeadCell>Status</StyledHeadCell>
                        <StyledHeadCell>Action</StyledHeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {campaignsData
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        ?.map((row: any, i: number) => (
                            <TableRow key={i}>
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
                                            src={row?.thumbnail}
                                            alt={row?.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </Box>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            marginTop: 6,
                                            color: "white",
                                        }}
                                    >
                                        {row?.name}
                                    </div>
                                </TableCell>

                                {/* Platform */}
                                <TableCell sx={{ color: "white", }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, }}>
                                        {row?.platforms.map((platform: string, index: number) => (
                                            <img
                                                key={index}
                                                src={`/${platform}.png`}
                                                alt={platform}
                                                style={{ width: 24, height: 24, background: "rgba(255,255,255,0.3)", borderRadius: 4, padding: 2 }}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                {/* OWNER */}
                                <TableCell sx={{ color: "white" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img
                                            src={row?.ownerPic}
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{row?.owner}</div>
                                            <div style={{ fontSize: 12, opacity: 0.7 }}>
                                                @{row?.username}
                                            </div>
                                        </div>
                                    </Box>
                                </TableCell>

                                {/* BUDGET */}
                                <TableCell sx={{ color: "white" }}>${row?.budget}</TableCell>

                                {/* INFLUENCERS */}
                                <TableCell sx={{ color: "white" }}>
                                    {row?.usedInfluencers}/{row?.totalInfluencers}
                                </TableCell>

                                {/* DURATION */}
                                <TableCell sx={{ color: "white" }}>
                                    {row?.start} → {row?.end}
                                </TableCell>

                                {/* STATUS */}
                                <TableCell>
                                    <span
                                        style={{
                                            backgroundColor:
                                                row?.status === "Active" ? "#E6F7E6" : "#FFE6E6",
                                            color: row?.status === "Active" ? "#2E7D32" : "#D32F2F",
                                            padding: "5px 12px",
                                            borderRadius: 20,
                                            fontWeight: 600,
                                            fontSize: 13,
                                        }}
                                    >
                                        {row?.status}
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
                                        {/* View */}
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
                        ))}
                </TableBody>
            </Table>

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
                    count={Math.ceil(campaignsData?.length / rowsPerPage)}
                    page={page + 1}
                    onChange={(_, value) => setPage(value - 1)}
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

const campaignsData = [
    {
        id: 1,
        thumbnail: "/campaign-img.png",
        platforms: ["instagram", "youtube"],
        name: "Feel the Vibe",
        owner: "DJ Nadir",
        username: "rikodj890",
        ownerPic: "profile14.jpg",
        budget: 1000,
        usedInfluencers: 25,
        totalInfluencers: 25,
        start: "01/06/2024",
        end: "30/06/2024",
        status: "Active",
        views: 5200,
    },
    {
        id: 2,
        thumbnail: "/campaign-img.png",
        platforms: ["instagram", "tiktok"],
        name: "Summer Splash Promo",
        owner: "Emily Rose",
        username: "emilyrose22",
        ownerPic: "profile14.jpg",
        budget: 1500,
        usedInfluencers: 18,
        totalInfluencers: 30,
        start: "15/06/2024",
        end: "15/07/2024",
        status: "Active",
        views: 7800,
    },
    {
        id: 3,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Tech Launch Week",
        owner: "TechWorld",
        username: "techworld_official",
        ownerPic: "profile14.jpg",
        budget: 5000,
        usedInfluencers: 40,
        totalInfluencers: 50,
        start: "10/05/2024",
        end: "10/06/2024",
        status: "Completed",
        views: 12400,
    },
    {
        id: 4,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Street Food Festival",
        owner: "Foodie Hub",
        username: "foodiehub",
        ownerPic: "profile14.jpg",
        budget: 800,
        usedInfluencers: 12,
        totalInfluencers: 20,
        start: "05/07/2024",
        end: "05/08/2024",
        status: "Active",
        views: 4300,
    },
    {
        id: 5,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Gaming Week Blast",
        owner: "PlayMax",
        username: "playmax_gaming",
        ownerPic: "profile14.jpg",
        budget: 3000,
        usedInfluencers: 30,
        totalInfluencers: 35,
        start: "01/05/2024",
        end: "25/05/2024",
        status: "Completed",
        views: 9800,
    },
    {
        id: 6,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Fashion Fiesta",
        owner: "Glamour Spot",
        username: "glamour_spot",
        ownerPic: "profile14.jpg",
        budget: 2500,
        usedInfluencers: 20,
        totalInfluencers: 25,
        start: "01/08/2024",
        end: "31/08/2024",
        status: "Upcoming",
        views: 0,
    },
    {
        id: 7,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Healthy Habits Challenge",
        owner: "FitLife",
        username: "fitlifebyamy",
        ownerPic: "profile14.jpg",
        budget: 1800,
        usedInfluencers: 13,
        totalInfluencers: 20,
        start: "20/06/2024",
        end: "20/07/2024",
        status: "Active",
        views: 6100,
    },
    {
        id: 8,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Luxury Car Showcase",
        owner: "AutoElite",
        username: "auto_elite",
        ownerPic: "profile14.jpg",
        budget: 7000,
        usedInfluencers: 28,
        totalInfluencers: 30,
        start: "01/04/2024",
        end: "30/04/2024",
        status: "Completed",
        views: 15900,
    },
    {
        id: 9,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Back to School Deals",
        owner: "EduMart",
        username: "edumart_store",
        ownerPic: "profile14.jpg",
        budget: 1200,
        usedInfluencers: 10,
        totalInfluencers: 15,
        start: "10/07/2024",
        end: "01/08/2024",
        status: "Active",
        views: 3400,
    },
    {
        id: 10,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Travel Summer Offers",
        owner: "TripBuzz",
        username: "tripbuzz",
        ownerPic: "profile14.jpg",
        budget: 3500,
        usedInfluencers: 22,
        totalInfluencers: 30,
        start: "01/05/2024",
        end: "01/06/2024",
        status: "Completed",
        views: 8800,
    },
    {
        id: 11,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Music Album Promo",
        owner: "BeatNation",
        username: "beatnation",
        ownerPic: "profile14.jpg",
        budget: 900,
        usedInfluencers: 7,
        totalInfluencers: 10,
        start: "20/05/2024",
        end: "05/06/2024",
        status: "Completed",
        views: 5600,
    },
    {
        id: 12,
        thumbnail: "/campaign-img.png",
        platforms: ["youtube", "instagram"],
        name: "Beauty Product Launch",
        owner: "GlowFair",
        username: "glowfair",
        ownerPic: "profile14.jpg",
        budget: 2100,
        usedInfluencers: 15,
        totalInfluencers: 20,
        start: "12/06/2024",
        end: "10/07/2024",
        status: "Active",
        views: 7200,
    },
];
