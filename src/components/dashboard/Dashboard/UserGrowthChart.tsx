import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useGetUsersGrowthQuery } from "../../../redux/features/dashboard/dashboardApi";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";



const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded-md bg-secondary/90 text-white shadow">
        <p className="font-semibold text-sm whitespace-nowrap">
          {`Month: ${payload[0].payload.month}`}
        </p>
        <p className="font-semibold text-sm whitespace-nowrap">
          {`Users: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

const currentYear = new Date().getFullYear();

const UserGrowthChart = () => {

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const {data: userData, refetch} = useGetUsersGrowthQuery({});
  
    const updateSearchParams = useUpdateSearchParams();
    const {year} = getSearchParams()
  
    useEffect(()=>{
      refetch()
    },[year])

  

  const handleChange = (event: any) => {
    setSelectedYear(Number(event.target.value));    
    updateSearchParams({year: Number(event.target.value)})
  };

  return (
    <div className="w-full p-5 bg-cardBg rounded-xl border border-white/20 shadow">
      <div className="flex items-center justify-between px-6">
        <p className="font-semibold text-secondary text-2xl">User Growth</p>
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

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={userData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="1" />
            <XAxis dataKey="monthName" />
            <YAxis axisLine={false} />
            <Tooltip content={CustomTooltip} />
            <Bar barSize={25} dataKey="newUsers" fill="var(--color-secondary)" opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;