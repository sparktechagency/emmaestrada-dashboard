import React from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { HiOutlineMailOpen } from "react-icons/hi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {
      email: formData.get("email") as string,
    };

    if (!values.email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      console.log("Forgot Password Request:", values);

      toast.success("Verification code sent to your email!");
      navigate("/verify-otp");
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      toast.error(error?.data?.message || "Something went wrong");
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
        style={{ minHeight: "80vh" }}
      >
        <div className="bg-cardBg rounded-lg p-6 border border-slate-500/50 w-full">
          <img src="/logo.png" alt="Logo" className="w-20 mb-2 mx-auto" />

          <p className="text-3xl text-center text-primary font-semibold mb-3">
            Reset Password
          </p>

          <p className="text-center text-textColor text-base mb-7">
            Enter your email to receive verification code.
          </p>

          <form onSubmit={handleForgotPassword}>
            <TextField
              name="email"
              type="email"
              label={<p className="text-white">Email</p>}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HiOutlineMailOpen className="text-textColor" />
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
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
                    borderColor: "#ededed",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ededed",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-primary"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: "bold",
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Continue
            </Button>
          </form>
        </div>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
