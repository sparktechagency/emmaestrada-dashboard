"use client";

import { AttachMoney, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SharedInput from "../../shared/SharedInput";
import { useGetCommissionQuery, useUpdateCommissionMutation, } from "../../../redux/features/setting/settingApi";
import { toast } from "sonner";

const CommissionManage = () => {
  // Separate commission values
  const [withdrawalFee, setWithdrawalFee] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);

  const { data: commissionData, refetch } = useGetCommissionQuery({})
  const [updateCommission] = useUpdateCommissionMutation()


  useEffect(() => {
    if (commissionData) {
      setWithdrawalFee(commissionData?.withdrawFee) ?? 0;
      setPlatformFee(commissionData?.platformFee
        ?? 0);
    }
  }, [commissionData])

  const [currentType, setCurrentType] = useState<"creator" | "campaign" | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ fee: "" });

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({ fee: "" });
      setCurrentType(null);
    }
  }, [isModalOpen]);

  const handleOpenModal = (type: "creator" | "campaign") => {
    setCurrentType(type);

    setFormData({
      fee:
        type === "creator"
          ? withdrawalFee.toString()
          : platformFee.toString(),
    });

    setIsModalOpen(true);
  };


  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const feeValue = parseFloat(formData.fee);
    try {
      if (currentType === "creator") {
        const res = await updateCommission({ id: commissionData?._id, withdrawFee: feeValue })
        if ((res as any)?.data?.success) {
          toast.success("Update creator commission successfully")
          refetch();
          setIsModalOpen(false);
        }

      } else if (currentType === "campaign") {
        const res = await updateCommission({ id: commissionData?._id, platformFee: feeValue })
        if ((res as any)?.data?.success) {
          toast.success("Update  platform fee successfully")
          refetch();
          setIsModalOpen(false);
        }
      }

    } catch (error) {
      console.log("error", error);
    }    
  };

  return (
    <Box p={4}>
      <Box sx={{ display: "flex", width: '100%', gap: 5, background: 'transparent' }}>
        {/* ============ Artist Commission ============ */}
        <Box sx={{ maxWidth: 600, width: "100%", }}>
          <Card sx={{ background: 'var(--color-cardBg)', border: '1px solid rgba(255,255,255,0.5)' }}>
            <CardHeader
              title={<h1 className="text-slate-200">Creator Commission (%)</h1>}
              action={
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => handleOpenModal("creator")}
                >
                  Edit
                </Button>
              }
            />

            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                p={3}
                borderRadius={2}
                bgcolor="#cd671c"
                color="white"
              >
                <Box
                  sx={{
                    background: "white",
                    borderRadius: "50%",
                    padding: 1.5,
                    mr: 3,
                  }}
                >
                  <AttachMoney fontSize="large" sx={{ color: "black" }} />
                </Box>

                <Box>
                  <Typography variant="body2">Creator Commission</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {withdrawalFee}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* ============ Promotor Commission ============ */}
        <Box sx={{ maxWidth: 600, width: "100%", }}>
          <Card sx={{ background: 'var(--color-cardBg)', border: '1px solid rgba(255,255,255,0.5)' }}>
            <CardHeader
              title={<h1 className="text-slate-200">Campaign Commission (%)</h1>}
              action={
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => handleOpenModal("campaign")}
                >
                  Edit
                </Button>
              }
            />

            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                p={3}
                borderRadius={2}
                bgcolor="#cd671c"
                color="white"
              >
                <Box
                  sx={{
                    background: "white",
                    borderRadius: "50%",
                    padding: 1.5,
                    mr: 3,
                  }}
                >
                  <AttachMoney fontSize="large" sx={{ color: "black" }} />
                </Box>

                <Box>
                  <Typography variant="body2">Campaign Commission</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {platformFee}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* -------------------- MODAL --------------------- */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
        maxWidth="sm"
        className="bg-black/40"
        PaperProps={{
          sx: {
            border: "2px solid rgba(255,255,255,0.2)",   // <-- White border
            borderRadius: "12px",        // <-- Smooth rounded corners
            backgroundColor: "var(--color-cardBg)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "var(--color-cardBg)",
            color: "white",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Edit {currentType === "creator" ? "Creator" : "Campaign"} Commission
        </DialogTitle>

        <form onSubmit={handleSubmit} className="bg-cardBg">
          <DialogContent
            sx={{
              background: "transparent",
              pt: 3,
            }}
          >
            <SharedInput
              label="Commission (%)"
              placeholder="Commission (%)"
              value={formData.fee}
              onChange={(e: any) => handleChange("fee", e.target.value)}
            />
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#cd671c",
                ":hover": { background: "#b45a19" },
              }}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </Box>
  );
};

export default CommissionManage;
