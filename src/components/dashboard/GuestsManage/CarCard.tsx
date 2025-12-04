import { Button, styled, type ButtonProps } from "@mui/material";
import { purple } from "@mui/material/colors";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const RatingButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[700]),
  backgroundColor: "#000000",
  borderRadius: "25px",
  width: 100,
}));
const CarCard = ({ data }: any) => {
  return (
    <div className="!bg-cardBg border border-slate-500/50 relative p-3 rounded-xl shadow-md mb-3 flex items-center gap-10 text-slate-200">
      <div className="w-[150px] h-[120px]">
        <img
          src={data?.image}
          alt=""
          className="w-full h-full rounded-xl object-cvover"
        />
      </div>
      <div className="">
        <h1 className="text-lg font-bold">{data?.brand}</h1>
        <p className="flex gap-2">
          <CiLocationOn size={20} /> {data?.area}
        </p>
        <h2 className="text-xl font-bold mb-2">
          {data?.rent}{" "}
          <span className="text-lg font-medium">/{data?.rentWise}</span>
        </h2>
        <RatingButton variant="contained" size="small" endIcon={<FaStar color="#FECB00" size={15} />} sx={{display: 'flex', alignItems: 'center'}}>
          <p className="text-sm">{data?.rating}</p>
        </RatingButton>
        <div
          className={`absolute top-4 right-5 ${
            data?.status.toLowerCase() == "complete"
              ? "text-green-600"
              : data?.status.toLowerCase() == "in progress"
              ? "text-blue-600"
              : " text-red-600"
          }`}
        >
          {data?.status}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
