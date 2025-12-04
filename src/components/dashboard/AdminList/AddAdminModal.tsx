import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface AddAdminModalProps {
  editData?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (values: any) => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  editData,
  open,
  setOpen,
  onSubmit,
}) => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  // Pre-fill when editing
  useEffect(() => {
    if (editData) {
      setValues({
        name: editData?.name || "",
        email: editData?.email || "",
        role: editData?.role || "",
        password: "",
      });
    }
  }, [editData]);

  const handleClose = () => {
    setOpen(false);
    setValues({
      name: "",
      email: "",
      role: "",
      password: "",
    });
  };

  const handleSubmit = () => {
    if (!values.name || !values.email || !values.role || (!editData && !values.password)) {
      return;
    }
    onSubmit(values);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontSize: 20, fontWeight: 600 }}>
        {!editData ? "Add Admin" : "Edit Admin"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>

          {/* Name */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
              InputProps={{ sx: { height: 45 } }}
            />
          </Grid>

          {/* Email */}
          <Grid size={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
              InputProps={{ sx: { height: 45 } }}
            />
          </Grid>

          {/* Role */}
          <Grid size={12}>
            <TextField
              fullWidth
              select
              label="Role"
              value={values.role}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
              required
              InputProps={{ sx: { height: 45 } }}
            >
              <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </TextField>
          </Grid>

          {/* Password (Add Only) */}
          {!editData && (
            <Grid size={12}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
                InputProps={{
                  sx: { height: 45 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <MdOutlineVisibilityOff size={22} />
                        ) : (
                          <MdOutlineVisibility size={22} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          size="large"
          sx={{ height: 45 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{ height: 45 }}
        >
          {!editData ? "Add Admin" : "Update Admin"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAdminModal;
