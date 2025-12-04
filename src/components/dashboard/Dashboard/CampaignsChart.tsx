import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TSubscriber = {
  month: string;
  total: number;
};

// Sample data for Total Subscribers
const subscriberData: TSubscriber[] = [
  { month: "Jan", total: 2220 },
  { month: "Feb", total: 1100 },
  { month: "Mar", total: 1250 },
  { month: "Apr", total: 1180 },
  { month: "May", total: 1400 },
  { month: "Jun", total: 1550 },
  { month: "Jul", total: 1650 },
  { month: "Aug", total: 1800 },
  { month: "Sep", total: 1900 },
  { month: "Oct", total: 1250 },
  { month: "Nov", total: 900 },
  { month: "Dec", total: 2600 },
];

const CampaignsChart = () => {
  const [filter, setFilter] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 rounded-md bg-secondary/90 text-white shadow">
          <p className="font-semibold text-sm whitespace-nowrap">
            {`Month: ${payload[0].payload.month}`}
          </p>
          <p className="font-semibold text-sm whitespace-nowrap">
            {`Subscribers: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-5 bg-cardBg rounded-xl border border-white/20  shadow ">
      <div className="flex items-center justify-between px-6">
        <p className="font-semibold text-secondary text-2xl">Total Campaigns</p>
        <Box sx={{ minWidth: 150 }}>
          <FormControl
            fullWidth
            sx={{
              background: "var(--color-black)",
              border: "1px solid var(--color-textColor)",
            }}
          >
            <InputLabel id="filter" size="small" className="!text-white">
              Year
            </InputLabel>
            <Select
              labelId="filter"
              label="Filter"
              onChange={handleChange}
              size="small"
              value={filter || ""}
              sx={{ background: "var(--color-black)", color: "#ededed" }}
              MenuProps={{
                PaperProps: {
                  sx: { backgroundColor: "#121212", color: "#ededed" },
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={subscriberData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="1" />
            <XAxis dataKey="month" />
            <YAxis axisLine={false} />
            <Tooltip content={CustomTooltip} />            
            <Bar barSize={25} dataKey="total" fill="var(--color-secondary)" opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignsChart;
