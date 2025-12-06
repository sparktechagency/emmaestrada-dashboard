import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  styled,
} from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import toast from "react-hot-toast";
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
const MOCK_ADMIN_DATA: Admin[] = [
  { _id: "1", name: "Alice Johnson", email: "admin1@example.com", role: "SUPER_ADMIN", status: "ACTIVE", joinDate: "2023-01-15" },
  { _id: "2", name: "Bob Smith", email: "admin2@example.com", role: "ADMIN", status: "INACTIVE", joinDate: "2023-05-20" },
  { _id: "3", name: "Charlie Brown", email: "admin3@example.com", role: "ADMIN", status: "ACTIVE", joinDate: "2024-03-10" },
];

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
  const [admins, setAdmins] = useState(MOCK_ADMIN_DATA);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleDeleteAdmin = () => {
    if (!selectedAdmin) return;
    setAdmins(prev => prev.filter(a => a._id !== selectedAdmin._id));
    toast.success("Admin deleted successfully");
    setSelectedAdmin(null);
    setOpenConfirm(false);
  };

  const handleUpdateStatus = (admin: Admin) => {
    setAdmins(prev =>
      prev.map(a =>
        a._id === admin._id ? { ...a, status: a.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : a
      )
    );
    toast.success("Admin status updated");
  };

  const handleCreateAdmin = (admin: Admin) => {
    setAdmins(prev => [...prev, { ...admin, _id: Date.now().toString() }]);
    toast.success("Admin added successfully");
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
              <StyledHeadCell>Join Date</StyledHeadCell>
              <StyledHeadCell>Actions</StyledHeadCell>
            </StyledRow>
          </TableHead>
          <TableBody>
            {admins.map((admin, index) => (
              <StyledRow key={admin._id}>
                <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                <TableCell sx={{ color: "white" }}>{admin.email}</TableCell>
                <TableCell sx={{ color: "white" }}>{admin.name}</TableCell>
                <TableCell sx={{ color: "white" }}>{admin.role.replace("_", " ")}</TableCell>
                <TableCell>
                  <span
                    style={{
                      backgroundColor: admin.status === "ACTIVE" ? "#E6F7E6" : "#4a4d52",
                      color: admin.status === "ACTIVE" ? "#2E7D32" : "#d5d7da",
                      padding: "5px 15px",
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {admin.status}
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{admin.joinDate}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 10 }}>
                    <IoEyeOutline
                      size={20}
                      className="text-blue-400 cursor-pointer"
                      onClick={() => { setSelectedAdmin(admin); setOpenDetails(true); }}
                    />
                    <IconButton onClick={() => handleUpdateStatus(admin)}>
                      {admin.status === "ACTIVE" ? <LockOpenIcon color="success" /> : <LockIcon color="error" />}
                    </IconButton>
                    <FaTrashAlt
                      size={18}
                      className="text-red-500 cursor-pointer"
                      onClick={() => { setSelectedAdmin(admin); setOpenConfirm(true); }}
                    />
                  </Box>
                </TableCell>
              </StyledRow>
            ))}
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
        onSubmit={(values: { email: string }) =>
          handleCreateAdmin({ ...values, name: values.email.split("@")[0], role: "ADMIN", status: "ACTIVE", joinDate: new Date().toISOString(), _id: Date.now().toString() })
        }
      />

      {/* Admin Details Modal */}
      {/* <UserDetailsModal open={openDetails} data={selectedAdmin} onClose={() => setOpenDetails(false)} /> */}
    </Box>
  );
};

export default AdminList;
