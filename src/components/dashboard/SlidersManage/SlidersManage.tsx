import {
    Box,
    Button,
    IconButton,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useAddSliderMutation, useDeleteSliderMutation, useGetSlidersQuery } from "../../../redux/features/sldier/sliderApi";
import SliderModal from "./SliderModal";

/* ---------------- TYPES ---------------- */
interface Slider {
    _id: string;
    image?: string;
    link?: string;
    isActive: boolean;
    createdAt: string;
}

/* ---------------- STYLES ---------------- */
const StyledHeadCell = styled(TableCell)(() => ({
    backgroundColor: "var(--color-primary)",
    color: "white",
    fontSize: 16,
    fontWeight: 600,
}));

const StyledRow = styled(TableRow)(() => ({
    "& td": {
        paddingTop: 14,
        paddingBottom: 14,
    },
}));

/* ---------------- COMPONENT ---------------- */
const SliderManage = () => {    
    const [openModal, setOpenModal] = useState(false);

    const { data: slidersData } = useGetSlidersQuery({});

    const [addSlider] = useAddSliderMutation();    
    const [deleteSlider] = useDeleteSliderMutation();

    /* ---------- HANDLERS ---------- */
    const handleCreate = async (data: any) => {
        const formData = new FormData();
        formData.append("image", data?.imageFile)
        formData.append("link", data?.link)

        try {
            const res = await addSlider(formData).unwrap();

            console.log("handleCreate", res);

            if (res?.data) toast.success(res?.message);
        } catch (error) {
            console.log("slider error", error);
        }
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            theme: "dark",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteSlider(id).unwrap();
                    Swal.fire("Deleted!", "Slider has been deleted.", "success");
                } catch (error) {
                    console.log("slider error", error);
                }
            }
        });
    };

    return (
        <Box sx={{ p: 3, backgroundColor: "var(--color-cardBg)", borderRadius: 2 }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h5" fontWeight={600} color="white">
                    Slider Management
                </Typography>
                <Button variant="contained" onClick={() => setOpenModal(true)}>
                    Add Slider
                </Button>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ background: "transparent" }}>
                <Table>
                    <TableHead>
                        <StyledRow>
                            <StyledHeadCell>SL</StyledHeadCell>
                            <StyledHeadCell>Name</StyledHeadCell>
                            <StyledHeadCell>Link</StyledHeadCell>
                            <StyledHeadCell>Created</StyledHeadCell>
                            <StyledHeadCell align="center">Actions</StyledHeadCell>
                        </StyledRow>
                    </TableHead>

                    <TableBody>
                        {slidersData?.length > 0 &&
                            slidersData?.map((slider: Slider, index: number) => (
                                <StyledRow key={slider._id}>
                                    <TableCell sx={{ color: "white" }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>                                        
                                        <img
                                            src={slider?.image ? `${imageUrl}${slider?.image}` : '/placeholder.png'}
                                            alt="thumbnail"
                                            style={{ width: 60, height: 60, objectFit: "cover" }}
                                            onError={(e: any) => {
                                                e.target.src = '/placeholder.png';
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        {slider?.link ? (
                                            <Link
                                                to={slider?.link}
                                                style={{ color: "#60a5fa" }}
                                            >
                                                {slider?.link}
                                            </Link>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        {dayjs(slider.createdAt).format("DD MMM, YYYY")}
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="center" gap={1}>                
                                            <IconButton
                                                onClick={() => handleDelete(slider._id)}
                                            >
                                                <FaTrashAlt color="#ef4444" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </StyledRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <SliderModal
                open={openModal}
                setOpen={(v: any) => {
                    setOpenModal(v);                    
                }}
                onSubmit={(data: any) => handleCreate(data)}
            />
        </Box>
    );
};

export default SliderManage;