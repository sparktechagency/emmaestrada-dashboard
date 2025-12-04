import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CiLock } from "react-icons/ci";
import SharedInput from "../../shared/SharedInput";

export const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    console.log("Form submitted:", values);

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Box
        className="w-xl p-6 shadow-md rounded-xl max-w-xl border bg-cardBg border-white/20"
      >

        <Typography
          variant="h5"
          className="text-xl flex items-center gap-3 justify-center font-semibold text-secondary"
        >
          Change Password <CiLock size={25} />
        </Typography>

        <form onSubmit={onSubmit} className="grid gap-4 mt-7">
          {/* Current Password */}
          <SharedInput
            label="Current Password"
            placeholder="Curent Password"
            value={values.currentPassword}
            onChange={(e: any) => handleChange("currentPassword", e.target.value)}
          />

          {/* New Password */}
          <SharedInput
            label="New Password"
            placeholder="New Password"
            value={values.password}
            onChange={(e: any) => handleChange("password", e.target.value)}
          />
          {/* New Password */}
          <SharedInput
            label="New Password"
            placeholder="New Password"
            value={values.confirmPassword}
            onChange={(e: any) => handleChange("confirmPassword", e.target.value)}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ background: "#CF9702" }}
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};
