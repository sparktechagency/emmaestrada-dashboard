import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginAdminMutation } from "../../redux/features/auth/authApi";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginAdminMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await login(values).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Login Successful");
        sessionStorage.setItem("accessToken", res?.data?.accessToken);
        sessionStorage.setItem("refreshToken", res?.data?.refreshToken);
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error?.data?.message || "Something went wrong while logging in"
      );
    }
  };

  
  return (
    <div  style={{ backgroundImage: `url('/authBg.png')` }} className={` bg-cover bg-center h-screen flex items-center justify-center `}>
      <div className="absolute top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-[4px] z-5" />
      
      
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
           
            <p className="text-3xl text-center text-primary font-semibold mb-7">
              Sign in to continue!
            </p>

            <form onSubmit={handleLogin}>
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
                      borderColor: "#ffffff", // hover border
                    },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#0095FF",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ededed",
                  },
                  }
                }}
              />

              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label={<p className="text-white">Password</p>}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineLock className="text-textColor" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? (
                          <IoMdEyeOff color="var(--color-textColor)" />
                        ) : (
                          <IoMdEye color="var(--color-textColor)" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--color-black-200)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // hover border
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ededed", // focused border
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ededed",
                  },
                  input: {
                    color: "white", // text color
                  },
                }}
              />

              <div className="flex items-center justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-textColor font-semibold underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!bg-primary"
                sx={{
                  mt: 2,
                  py: 1.2,
                  fontWeight: "bold",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>      
    </div>
  );
};

export default SignIn;
