// import { ConfigProvider, Select } from "antd";
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

// const { Option } = Select;

type TUserGrowth = {
  month: string;
  guest: number;
  hosts: number;
};

// Sample chart data
const userGrowthData: TUserGrowth[] = [
  { month: "Jan", guest: 800, hosts: 400 },
  { month: "Feb", guest: 900, hosts: 600 },
  { month: "Mar", guest: 1000, hosts: 800 },
  { month: "Apr", guest: 1100, hosts: 900 },
  { month: "May", guest: 1300, hosts: 1000 },
  { month: "Jun", guest: 1400, hosts: 1100 },
  { month: "Jul", guest: 1500, hosts: 1200 },
  { month: "Aug", guest: 1600, hosts: 1400 },
  { month: "Sep", guest: 1700, hosts: 1500 },
  { month: "Oct", guest: 1800, hosts: 1700 },
  { month: "Nov", guest: 2000, hosts: 1800 },
  { month: "Dec", guest: 2200, hosts: 2000 },
];

const TotalUserChart = () => {
  const [age, setAge] = useState("");

  const CustomTooltip = ({ active, payload }: any) => {
    const isVisible = active && payload && payload.length;

    return (
      <div
        className="top-20 mr-10 mb-10 "
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {isVisible && (
          <div className="p-2 rounded-md bg-primary/90 text-white shadow">
            <p className="label  font-semibold text-sm whitespace-nowrap">{`New : ${payload[0]?.value}`}</p>
            <p className="label  font-semibold text-sm whitespace-nowrap">{`${payload[0]?.name} : ${payload[0].value}`}</p>
            <span></span>
          </div>
        )}
      </div>
    );
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    setAge(event.target.value as string);
  };

  return (
    <div className="w-full pb-5 pt-8 bg-cardBg rounded-xl mt-6 shadow mb-10">
      <div className="flex items-center justify-between px-6">
        <p className="font-semibold text-primary text-2xl">Geasts Vs Hosts</p>
        <Box
          sx={{
            minWidth: 150,
            py: 0,
          }}
        >
          ;
          <FormControl
            fullWidth
            sx={{
              background: "var(--color-black)",
              border: "1px solid var(--color-textColor)",
            }}
          >
            <InputLabel id="chart" size="small" className="!text-white">
              Age
            </InputLabel>
            <Select
              labelId="chart"
              label="Monthly"
              onChange={handleChange}
              size="small"
              value={age || ""}
              sx={{ background: "var(--color-black)", color: "#ededed" }} 
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#121212", 
                    color: "#ededed"
                  },
                },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Guest" sx={{ display: "flex" }}>
                <span className="w-3 h-3 bg-blue mr-2 inline-block" /> Guests
              </MenuItem>
              <MenuItem value="Hosts" sx={{ display: "flex" }}>
                <span className="w-3 h-3 bg-primary mr-2 inline-block" /> Hosts
              </MenuItem>
            </Select>
          </FormControl>
        </Box>        
      </div>

      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={userGrowthData}
            style={{ backgroundColor: "rgba(0,0,,0,.3)" }}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray={1} />
            <XAxis dataKey="month" />
            <YAxis axisLine={false} />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Bar
              barSize={25}
              //   radius={50}
              dataKey="guest"
              fill="#3781FD"
            />
            <Bar
              barSize={25}
              //   radius={50}
              dataKey="hosts"
              fill="var(--color-primary)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalUserChart;

export const userChartData = [
  { month: "Jan", Total: 1200, Users: 2220 },
  { month: "Feb", Total: 1500, Users: 1100 },
  { month: "Mar", Total: 1700, Users: 1250 },
  { month: "Apr", Total: 1600, Users: 1180 },
  { month: "May", Total: 1900, Users: 1400 },
  { month: "Jun", Total: 2100, Users: 1550 },
  { month: "Jul", Total: 2300, Users: 1650 },
  { month: "Aug", Total: 2500, Users: 1800 },
  { month: "Sep", Total: 2700, Users: 1900 },
  { month: "Oct", Total: 2900, Users: 1250 },
  { month: "Nov", Total: 3100, Users: 900 },
  { month: "Dec", Total: 3500, Users: 2600 },
];
