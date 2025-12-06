import { Box, Card, IconButton, Typography } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { PiCurrencyDollar } from "react-icons/pi";
import { useState } from "react";

const CommissionManage = () => {
  const [artistCommission, setArtistCommission] = useState(0);
  const [promoterCommission, setPromoterCommission] = useState(0);

  return (
    <Box className="p-6">
      <Typography variant="h5" fontWeight={700} mb={3}>
        Commission Management
      </Typography>

      {/* ===== Card Wrapper ===== */}
      <Box className="flex flex-col gap-5 max-w-xl">

        {/* -------- Artist Commission -------- */}
        <Card className="p-4 shadow-md rounded-xl">
          <Box className="flex justify-between items-center mb-3">
            <Typography variant="h6" fontWeight={600}>
              Commission for Artist Campaign
            </Typography>
            <IconButton size="small" className="text-gray-600 hover:text-black">
              <MdEdit size={18} />
            </IconButton>
          </Box>

          <Box className="bg-[#D66919] rounded-lg p-4 flex items-center gap-4">
            <Box className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
              <PiCurrencyDollar size={28} />
            </Box>
            <Box>
              <Typography className="text-white text-sm">
                Artist Campaign Commission
              </Typography>
              <Typography className="text-white text-2xl font-bold">
                {artistCommission}%
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* -------- Promoter Commission -------- */}
        <Card className="p-4 shadow-md rounded-xl">
          <Box className="flex justify-between items-center mb-3">
            <Typography variant="h6" fontWeight={600}>
              Commission for Promoter Campaign
            </Typography>
            <IconButton size="small" className="text-gray-600 hover:text-black">
              <MdEdit size={18} />
            </IconButton>
          </Box>

          <Box className="bg-[#D66919] rounded-lg p-4 flex items-center gap-4">
            <Box className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
              <PiCurrencyDollar size={28} />
            </Box>
            <Box>
              <Typography className="text-white text-sm">
                Promoter Campaign Commission
              </Typography>
              <Typography className="text-white text-2xl font-bold">
                {promoterCommission}%
              </Typography>
            </Box>
          </Box>
        </Card>

      </Box>
    </Box>
  );
};

export default CommissionManage;
