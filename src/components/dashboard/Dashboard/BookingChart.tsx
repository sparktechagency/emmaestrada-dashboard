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
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const currentYear = new Date().getFullYear();

const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF0000"];

const BookingChart = () => {
  const [selectedYear, setSelectedYear] = useState("");

  const data01 = [
    { name: "Completed", value: 700 },
    { name: "Upcoming", value: 300 },
    { name: "Active", value: 300 },
    { name: "Cancelled", value: 200 },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setSelectedYear(value);
  };

  const renderCustomizedLabel = ({ percent }: any) =>
  `${(percent * 100).toFixed(1)}%`;

  return (
    <div className="bg-cardBg p-5 pb-0 rounded-xl h-full shadow">
      <div className="flex  items-center justify-between ">
        <div className="">
          <p className="font-semibold text-primary text-2xl">Booking</p>
        </div>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth size="small">
            <InputLabel size="small" id="booking">
              Year
            </InputLabel>
            <Select
              labelId="booking"
              size="small"
              value={selectedYear}
              onChange={handleChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={currentYear}>{currentYear}</MenuItem>
              <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
              <MenuItem value={currentYear - 2}>{currentYear - 2}</MenuItem>
              <MenuItem value={currentYear - 3}>{currentYear - 3}</MenuItem>
              <MenuItem value={currentYear - 4}>{currentYear - 4}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <Box sx={{ height: 280, width: "100%", display: "flex", alignItems: 'end' }}>
        <ResponsiveContainer className="w-full h-[450px]">
          <PieChart cx="Percentage">
            <Pie
              data={data01}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius="50%"
              fill="#8884d8"              
              label={renderCustomizedLabel}
              // isAnimationActive={isAnimationActive}
            >
              {data01.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 bg-[#00C49F] inline-block " /> Completed
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 bg-[#FFBB28] inline-block " /> Upcoming
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 bg-[#0088FE] inline-block " /> Active
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-3 h-3 bg-[#FF0000] inline-block " /> Cancelled
          </div>
        </div>
      </Box>
    </div>
  );
};

export default BookingChart;
