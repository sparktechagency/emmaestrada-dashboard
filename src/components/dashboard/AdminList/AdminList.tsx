import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useState } from "react";

import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { useCreateAdminMutation, useDeleteAdminMutation, useGetAdminQuery } from "../../../redux/features/user/userApi";
import ConfirmModal from "../../UI/ConfirmModel";
import AddAdminModal from "./AddAdminModal"; // Your existing AddAdminModal

// ---------- MOCK DATA ----------
interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
  joinDate: string;
}

// ------------------ TABLE STYLES -------------------
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

// ---------------- ADMIN LIST COMPONENT ----------------
const AdminList: React.FC = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [createAdmin] = useCreateAdminMutation()
  const { data: adminsData } = useGetAdminQuery({});
  const [deleteAdmin] = useDeleteAdminMutation();


  const handleDeleteAdmin = async () => {
    try {
      const res = await deleteAdmin(selectedAdmin?._id).unwrap();      
      toast.success(res?.data?.message);
          setSelectedAdmin(null);
    setOpenConfirm(false);
    } catch (error) {
      console.log("error");
    }    
  };



  const handleCreateAdmin = async (values: Admin) => {
    try {
      const res = await createAdmin(values).unwrap();
      toast.success(res?.data?.message);
    } catch (error) {
      console.log("error");

    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: 'var(--color-cardBg)', borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="white">
          Admin Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
          Add Admin
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
        <Table>
          <TableHead>
            <StyledRow>
              <StyledHeadCell>SL No</StyledHeadCell>
              <StyledHeadCell>Email</StyledHeadCell>
              <StyledHeadCell>Name</StyledHeadCell>
              <StyledHeadCell>Role</StyledHeadCell>
              <StyledHeadCell>Status</StyledHeadCell>
              <StyledHeadCell>Actions</StyledHeadCell>
            </StyledRow>
          </TableHead>
          <TableBody>
            {adminsData?.length > 0 ? adminsData?.map((admin: any, index: number) => (
              <StyledRow key={index}>
                <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                <TableCell sx={{ color: "white" }}>{admin?.email}</TableCell>
                <TableCell sx={{ color: "white" }}>{admin?.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{admin?.role}</TableCell>
                <TableCell>
                  <span
                    style={{
                      backgroundColor: admin?.status === "active" ? "#E6F7E6" : "#4a4d52",
                      color: admin?.status === "active" ? "#2E7D32" : "#d5d7da",
                      padding: "5px 15px",
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {admin?.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", gap:2 }}>                    
                    <FaTrashAlt
                      size={18}
                      className="text-red-500 cursor-pointer"
                      onClick={() => { setSelectedAdmin(admin); setOpenConfirm(true); }}
                    />
                  </Box>
                </TableCell>
              </StyledRow>
            )) : <p>No data</p>}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={openConfirm}
        title="Delete Admin?"
        content={`Are you sure you want to delete "${selectedAdmin?.name}"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteAdmin}
        onCancel={() => { setSelectedAdmin(null); setOpenConfirm(false); }}
      />

      {/* Add Admin Modal */}
      <AddAdminModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        onSubmit={(values) =>
          handleCreateAdmin(values)
        }
      />

    </Box>
  );
};

export default AdminList;
