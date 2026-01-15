import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetRevenueGrowthQuery } from "../../../redux/features/dashboard/dashboardApi";

import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";

const currentYear = new Date().getFullYear();

const RevenueCharts = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const { data: revenueData, refetch } = useGetRevenueGrowthQuery({})

  const updateSearchParams = useUpdateSearchParams();
  const {year} = getSearchParams()

  useEffect(()=>{
    refetch()
  },[year])
  

  const CustomTooltip = ({ active, payload, label }: any) => {
    const isVisible = active && payload && payload.length;

    return (
      <div
        className="custom-tooltip "
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <div className="w-full py-3 pl-2 text-start bg-secondary/90 rounded-xl">
            <p className="text-white whitespace-nowrap font-semibold">
              {label}
            </p>
            <p className="text-white whitespace-nowrap">{`$${payload[0].value}`}</p>
          </div>
        )}
      </div>
    );
  };

  const handleChange = (event: SelectChangeEvent) => {

    const value = event.target.value as string
    setSelectedYear(value)
    updateSearchParams({year: value})
  };

  return (
    <div className="">
      <div className="bg-cardBg p-6 rounded-xl border border-white/20 shadow ">
        <div className="flex items-center justify-between gap-8 mb-3">
          <div className="">
            <p className="font-semibold text-secondary text-2xl">Revenue Growth</p>
          </div>
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth
              sx={{
                background: "var(--color-black)",
                border: "1px solid var(--color-textColor)",
              }}>
              <InputLabel id="revenue" size="small" sx={{ color: "#ffffff" }}>Year</InputLabel>
              <Select
                labelId="revenue"
                label="Year"
                size="small"
                onChange={handleChange}
                value={selectedYear || ""}
                sx={{ background: "var(--color-black)", color: "#ededed" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--color-black)",
                      color: "#ededed"
                    },
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={currentYear}>{currentYear}</MenuItem>
                <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
                <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
                <MenuItem value={currentYear - 3}>{currentYear - 3}</MenuItem>

              </Select>
            </FormControl>
          </Box>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={revenueData}
            margin={{ left: 0, top: 20, right: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="var(--color-secondary)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="monthName"
              stroke="none"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888", fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ width: 100 }} content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="platformFee"
              stroke="#0C1326"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#earnings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueCharts;
