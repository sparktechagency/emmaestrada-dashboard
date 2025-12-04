import { Box } from "@mui/material";
import { FiDollarSign, FiTv, FiUserCheck, FiUsers, FiVideo } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { IoMusicalNotes } from "react-icons/io5";
const Statics = () => {
  const dashboardStats = [
    { id: 1, title: "Total Artist", value: 1234, icon: <FiUsers size={30} /> },
    { id: 2, title: "Total Music Promotors", value: "150", icon: <GoComment size={30} />, },
    { id: 3, title: "Total Influencers", value: 3567, icon: <FiUserCheck size={30} /> },
    { id: 4, title: "Total User", value: 120, icon: <FiUserCheck size={30} /> },
    { id: 5, title: "Active Campaigns", value: 1200, icon: <IoMusicalNotes size={30} /> },
    { id: 6, title: "Total Revenue", value: 120, icon: <FiDollarSign size={30} /> },

  ];


  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-x-5 xl:gap-y-7  justify-between mb-3">
      {dashboardStats.map((item) => (
        <Box
          key={item.id}
          sx={{
            borderRadius: 2,
            p: 3,
          }}
          className="bg-cardBg border border-white/20 shadow-md"
        >
          <div className="flex justify-between items-center">
            {item.icon && <div className="text-white bg-secondary w-18 flex items-center justify-center p-4 rounded-lg">{item.icon}</div>}
            <div className="">
              <h1 className="text-4xl font-semibold text-white text-right">
                {item.value}
              </h1>
              <p className="text-lg text-[#99A1AF] font-light">{item.title}</p>
            </div>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default Statics;
