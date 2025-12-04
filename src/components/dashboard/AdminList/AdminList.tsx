import {
  Button,
  Box,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import React, { useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import ConfirmModal from "../../UI/ConfirmModel";

// --- MOCK INTERFACES AND DATA (Replace with your actual types and RTK hooks) ---

interface Admin {
  _id: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
  joinDate: string;
  name: string;
}

const MOCK_ADMIN_DATA: Admin[] = [
  { _id: "1", email: "admin1@example.com", role: "SUPER_ADMIN", status: "ACTIVE", joinDate: "2023-01-15T10:00:00Z", name: "Alice Johnson" },
  { _id: "2", email: "admin2@example.com", role: "ADMIN", status: "INACTIVE", joinDate: "2023-05-20T11:00:00Z", name: "Bob Smith" },
  { _id: "3", email: "admin3@example.com", role: "ADMIN", status: "ACTIVE", joinDate: "2024-03-10T12:00:00Z", name: "Charlie Brown" },
];

// Mock RTK-Query hooks for demonstration purposes
const useGetAdminQuery = () => {
  const [data, setData] = useState(MOCK_ADMIN_DATA);

  const refetch = () => {
    // Simulate refetch logic
    console.log("Mock refetch triggered");
    setData([...MOCK_ADMIN_DATA]); // Re-set mock data
  };

  return { data, refetch };
};

const useUpdateUserMutation = () => [async (data: { id: string, status: string }) => {
  console.log("Mock updateUser mutation called with:", data);
  // Simulate API call success/failure
  return { data: { message: `User status updated to ${data.status}` } };
}];

const useDeleteUserMutation = () => [async (id: string) => {
  console.log("Mock deleteUser mutation called for ID:", id);
  // Simulate API call success/failure
  return { data: { message: "User deleted successfully" } };
}];

const useCreateAdminMutation = () => [async (values: { email: string }) => {
  console.log("Mock createAdmin mutation called with:", values);
  // Simulate API call success/failure
  return { data: { message: "Admin created successfully" } };
}];

// --- MOCK MODALS ---

interface ConfirmModalProps {
  open: boolean;
  title: string;
  content: string;
  okText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, title, content, okText, cancelText, onConfirm, onCancel }) => (
//   <Dialog open={open} onClose={onCancel}>
//     <DialogTitle>{title}</DialogTitle>
//     <DialogContent>
//       <Typography>{content}</Typography>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onCancel}>{cancelText}</Button>
//       <Button onClick={onConfirm} color="error" variant="contained">{okText}</Button>
//     </DialogActions>
//   </Dialog>
// );

interface AddAdminModalProps {
  editData: Admin | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (values: { email: string }) => Promise<void>;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ open, setOpen, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await onSubmit({ email });
      setOpen(false);
      setEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Add New Admin</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!email}>
          Create Admin
        </Button>
      </DialogActions>
    </Dialog>
  );
};


// --- MAIN COMPONENT ---

const headCells = [
  { id: 'slNo', label: 'SL No', width: 80 },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'joinDate', label: 'Join Date' },
  { id: 'action', label: 'Action', width: 130 },
];

const AdminList: React.FC = () => {
  // Replace with actual RTK-Query hooks
  const { data: adminData, refetch } = useGetAdminQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [createAdmin] = useCreateAdminMutation();

  const [selectedUser, setSelectedUser] = useState<Admin | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleUpdateStatus = async (record: Admin) => {
    try {
      const newStatus = record.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const data = {
        id: record._id,
        status: newStatus,
      };
      const res = await updateUser(data).unwrap();

      toast.success(res?.data?.message);
      refetch(); // Trigger re-fetch after successful update
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteAdmin = async () => {
    if (!selectedUser) return;
    try {
      const res = await deleteUser(selectedUser._id).unwrap();

      console.log("delete", res);
      toast.success("Admin deleted successfully");
      refetch(); // Trigger re-fetch after successful delete
      setSelectedUser(null);
      setOpenConfirm(false);
    } catch (error: any) {
      console.log("delete error", error);
      toast.error(error?.data?.message || "Failed to delete admin");
    }
  };

  const handleCreateAdmin = async (values: { email: string }) => {
    try {
      await createAdmin(values).unwrap();
      toast.success("Admin created successfully");
      refetch();
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to create admin");
    }
  };

  const renderStatus = (status: Admin['status']) => (
    <Typography
      variant="body2"
      fontWeight="medium"
      sx={{
        color: status === "ACTIVE" ? 'success.main' : 'error.main',
      }}
    >
      {status}
    </Typography>
  );

  const renderActions = (record: Admin) => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Tooltip title="View Details">
        <IconButton size="small" color="primary" onClick={() => console.log("View:", record)}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={record.status === "ACTIVE" ? "Deactivate User" : "Activate User"}>
        <IconButton
          size="small"
          onClick={() => handleUpdateStatus(record)}
          sx={{ color: record.status === "ACTIVE" ? 'success.dark' : 'error.dark' }}
        >
          {record.status === "ACTIVE" ? <LockOpenIcon fontSize="small" /> : <LockIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Admin">
        <IconButton
          size="small"
          color="error"
          onClick={() => {
            setSelectedUser(record);
            setOpenConfirm(true);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  return (
    <Box sx={{
      backgroundColor: 'white',
      borderRadius: '12px',
      p: 3,
      height: '100%',
      boxShadow: 1,
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          Admin Management
        </Typography>
        <Button
          onClick={() => setOpenAddModal(true)}
          variant="contained"
          color="primary"
          size="large"
          sx={{ textTransform: 'none' }}
        >
          Add Admin
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold', backgroundColor: 'grey.100' } }}>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.id === 'action' ? 'center' : 'left'}
                  style={{ width: headCell.width }}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {adminData.map((row, index) => (
              <TableRow
                key={row._id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role.split("_").join(" ")}</TableCell>
                <TableCell>{renderStatus(row.status)}</TableCell>
                <TableCell>{dayjs(row.joinDate).format("DD MMM, YY")}</TableCell>
                <TableCell align="center">{renderActions(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Modal */}
      <ConfirmModal
        open={openConfirm}
        title="Delete Admin?"
        content={`Are you sure you want to delete "${selectedUser?.name || selectedUser?.email || 'this'}" Admin?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteAdmin}
        onCancel={() => {
          setOpenConfirm(false);
          setSelectedUser(null);
        }}
      />

      {/* Add/Edit Admin Modal */}
      <AddAdminModal
        editData={selectedUser}
        open={openAddModal}
        setOpen={setOpenAddModal}
        onSubmit={handleCreateAdmin}
      />
    </Box>
  );
};

export default AdminList;