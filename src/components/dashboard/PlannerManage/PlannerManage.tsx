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
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  useAddPlannerMutation,
  useDeletePlannerMutation,
  useGetPlannersQuery,
  useUpdatePlannerMutation,
} from "../../../redux/features/planner/plannerApi";
import PlannerModal from "./PlannerModal";

/* ---------------- TYPES ---------------- */
interface Planner {
  _id: string;
  name: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
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
const PlannerManage = () => {
  const [selected, setSelected] = useState<Planner | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const { data: plannersData } = useGetPlannersQuery({});
  const [addPlanner] = useAddPlannerMutation();
  const [updatePlanner] = useUpdatePlannerMutation();
  const [deletePlanner] = useDeletePlannerMutation();

  console.log("plannersData", plannersData);
  

  /* ---------- HANDLERS ---------- */
  const handleCreate = async (data: any) => {
    try {
      const res = await addPlanner(data).unwrap();
      if (res?.data) {
        toast.success(res?.message);
      }else if(res?.error){
        toast.success(res?.error?.message);
      }
    } catch (error:any) {
      console.log("Planner Error", error?.data?.message);
      toast.error(error?.data?.message);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      const res = await updatePlanner({
        id: selected?._id,
        name: data?.name,
        rating: data?.rating,
      }).unwrap();
      if (res?.data) {
        toast.success(res?.message);
      }else if(res?.error){
        toast.error(res?.error?.message);
      }
    } catch (error:any) {
      console.log("Planner Error", error?.data?.message);
      toast.error(error?.data?.message);
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      theme: "dark",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePlanner(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Planner has been deleted.",
            icon: "success",
            theme: "dark",
          });
        } catch (error) {
          console.log("Planner Error", error);
        }
      }
    });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "var(--color-cardBg)", borderRadius: 2 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={600} color="white">
          Campaign Planner Management
        </Typography>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Planner
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ background: "transparent" }}>
        <Table>
          <TableHead>
            <StyledRow>
              <StyledHeadCell>SL</StyledHeadCell>
              <StyledHeadCell>Name</StyledHeadCell>
              <StyledHeadCell>Rating</StyledHeadCell>
              <StyledHeadCell>Created</StyledHeadCell>
              <StyledHeadCell align="center">Actions</StyledHeadCell>
            </StyledRow>
          </TableHead>
          <TableBody>
            {plannersData?.length > 0 &&
              plannersData.map((planner: Planner, index: number) => (
                <StyledRow key={planner._id}>
                  <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: "white" }}>{planner.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <span style={{ color: "#fbbf24", fontSize: 18 }}>★</span>
                      <span>{planner.rating}</span>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {dayjs(planner.createdAt).format("DD MMM, YYYY")}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={1}>
                      <IconButton
                        onClick={() => {
                          setSelected(planner);
                          setOpenModal(true);
                        }}
                      >
                        <FaEdit color="#60a5fa" />
                      </IconButton>

                      <IconButton onClick={() => handleDelete(planner._id)}>
                        <FaTrashAlt color="#ef4444" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </StyledRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add / Edit Modal */}
      <PlannerModal
        open={openModal}
        editData={selected}
        setOpen={(v:any) => {
          setOpenModal(v);
          if (!v) setSelected(null);
        }}
        onSubmit={(data:any) =>
          selected ? handleUpdate(data) : handleCreate(data)
        }
      />
    </Box>
  );
};

export default PlannerManage;