// pages/Genres.tsx
import { Box } from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const genreColors = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#FF0000"];

const genreData = [
  { name: "Action", value: 400 },
  { name: "Drama", value: 300 },
  { name: "Comedy", value: 300 },
  { name: "Horror", value: 200 },
  { name: "Romance", value: 150 },
];

const Genres = () => {
  return (
    <Box sx={{ height: '100%' }} className="flex-1 bg-cardBg p-6 rounded-xl shadow">
      <h1 className="text-2xl text-primary font-semibold mb-4">Genres Chart</h1>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={genreData}
            cx="50%"
            cy="50%"
            outerRadius="60%"
            innerRadius="40%"
            dataKey="value"
            label
          >
            {genreData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={genreColors[index % genreColors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Genres;
