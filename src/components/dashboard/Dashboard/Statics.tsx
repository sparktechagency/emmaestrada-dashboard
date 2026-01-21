import { Box } from "@mui/material";
import { FiDollarSign, FiUserCheck, FiUsers } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { IoMusicalNotes } from "react-icons/io5";
import { useGetAnalyticsQuery } from "../../../redux/features/dashboard/dashboardApi";
const Statics = () => {

  const { data: staticData } = useGetAnalyticsQuery({});

  console.log("staticData", staticData);



  const dashboardStats = [
    { id: 1, title: "Active Campaign", value: staticData?.activeCampaigns ?? 0, icon: <FiUsers size={30} /> },
    { id: 2, title: "Total Creators", value: staticData?.totalCreators ?? 0, icon: <GoComment size={30} />, },
    { id: 3, title: "Total Promotor", value: staticData?.totalPromoters ?? 0, icon: <FiUserCheck size={30} /> },
    { id: 4, title: "Total Order Amount", value: staticData?.totalOrderAmount?.toFixed(2) ?? 0, icon: <FiUserCheck size={30} /> },
    { id: 5, title: "Total Received Amount", value: staticData?.totalReceivedAmount?.toFixed(2) ?? 0, icon: <IoMusicalNotes size={30} /> },
    { id: 6, title: "Total Commission", value: staticData?.totalPlatformFee?.toFixed(2) ?? 0, icon: <FiDollarSign size={30} /> },

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
          className={` border border-white/20 shadow-md bg-cardBg `}
        >
          <div className="flex justify-between items-center">
            {item.icon && <div className="text-white bg-secondary w-18 flex items-center justify-center p-4 rounded-lg">{item.icon}</div>}
            <div className="">
              <h1 className={`text-4xl font-semibold  text-right 
                ${ item?.title === "Total Commission" ? item?.value >= 0 ? "text-green-500 font-semibold" : "text-red-600 font-light"  :"text-gray-300 font-light"}`}>
                {item.value}
              </h1>
              <p className={`text-lg   
                ${ item?.title === "Total Commission" ? item?.value >= 0 ? "text-green-500 font-semibold" : "text-red-600 font-light"  :"text-gray-300 font-light"}`}>{item.title}</p>
            </div>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default Statics;
