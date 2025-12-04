import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OTPVerify: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // keep only last digit
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOTPVerify = async (e: any) => {
    e.preventDefault();

    const otpCode = otp.join("");

    if (otpCode.length < 4) {
      toast.error("Please enter the complete OTP");
      return;
    }

    try {
      console.log("OTP Verify Request:", otpCode);
      toast.success("OTP Verified successfully!");
      navigate("/new-password");
    } catch (error: any) {
      console.error("OTP Verify Error:", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleResend = () => {
    toast.success("OTP resent successfully!");
    setOtp(["", "", "", ""]);
    const firstInput = document.getElementById("otp-0");
    firstInput?.focus();
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
          <img src="/logo.png" alt="Logo" className="w-20 mb-3 mx-auto" />

          <p className="text-3xl text-center text-primary font-semibold mb-3">
            Verify OTP
          </p>

          <p className="text-center text-textColor text-base mb-7">
            Enter the verification code sent to your email.
          </p>

          <form onSubmit={handleOTPVerify}>
            {/* OTP Inputs */}
            <Box display="flex" justifyContent="center" mb={5} gap={3}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "20px",
                    },
                  }}
                  sx={{
                    width: 60,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "var(--color-black-200)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffffff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ededed",
                        borderWidth: 2,
                      },
                    },
                  }}
                  variant="outlined"
                />
              ))}
            </Box>

            {/* Timer */}
            <div className="text-center mb-5">
              <p className="text-textColor mb-2">A code has been sent</p>
              <span className="text-primary text-xl font-semibold">
                00:00
              </span>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-primary"
              sx={{
                height: 50,
                borderRadius: "20px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                mb: 2,
              }}
            >
              Verify
            </Button>

            {/* Resend */}
            <Button
              fullWidth
              variant="outlined"
              onClick={handleResend}
              sx={{
                color: "#FF6F61",
                borderColor: "#FF6F61",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                borderRadius: "20px",
              }}
            >
              Resend OTP
            </Button>
          </form>
        </div>
      </Grid>
    </div>
  );
};

export default OTPVerify;
