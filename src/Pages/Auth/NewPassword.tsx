import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const NewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleNewPassword = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log("New Password Request:", values);
      toast.success("Password updated successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("New Password Error:", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url('/authBg.png')` }}
      className="bg-cover bg-center h-screen flex items-center justify-center relative"
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-[4px] z-5" />

      <Grid
        className="absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        maxWidth="sm"
        container
        justifyContent="center"
        alignItems="center"
      >
        <div className="bg-cardBg rounded-lg p-6 border border-slate-500/50 w-full">
          <img src="/logo.png" alt="Logo" className="w-24 mb-3 mx-auto" />

          <p className="text-3xl text-center text-primary font-semibold mb-3">
            Set New Password
          </p>

          <p className="text-center text-textColor text-base mb-7">
            Create a strong password to secure your account.
          </p>

          <form onSubmit={handleNewPassword}>
            {/* New Password */}
            <TextField
              name="newPassword"
              type={showPassword ? "text" : "password"}
              label={<p className="text-white">New Password</p>}
              fullWidth
              required
              variant="outlined"
              margin="normal"
              placeholder="Enter new password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? (
                        <MdOutlineVisibilityOff color="var(--color-textColor)" />
                      ) : (
                        <MdOutlineVisibility color="var(--color-textColor)" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: "#ffffff",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-black-200)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0095FF",
                    borderWidth: 2,
                  },
                },
              }}
            />

            {/* Confirm Password */}
            <TextField
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label={<p className="text-white">Confirm Password</p>}
              fullWidth
              required
              variant="outlined"
              margin="normal"
              placeholder="Confirm password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <MdOutlineVisibilityOff color="var(--color-textColor)" />
                      ) : (
                        <MdOutlineVisibility color="var(--color-textColor)" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: "#ffffff",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-black-200)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0095FF",
                    borderWidth: 2,
                  },
                },
              }}
            />

            {/* Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-primary"
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: "20px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Update Password
            </Button>
          </form>
        </div>
      </Grid>
    </div>
  );
};

export default NewPassword;
