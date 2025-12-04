import {
  Avatar,
  Grid
} from "@mui/material";
import CarCard from "../GuestsManage/CarCard";

const HostDetails = () => {
  return (
    <div className="h-full  ">
      <Grid container spacing={10}>
        <Grid
          sx={{ background: "#FEFEFE" }}
          className="shadow p-5 !rounded-2xl"
          size={6}
        >
          <div className="w-[200px] h-[250px] mb-4">
            <Avatar
              src="/profile14.jpg"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 5,
              }}
            />
          </div>
          <div className="">
            <h3 className="font-semibold text-lg mb-5">User Information</h3>
            <Grid container size={12} spacing={2}>
              <Grid size={6}>Name</Grid>
              <Grid size={6}>Alexandra Daddario</Grid>
              <Grid size={6}>Email</Grid>
              <Grid size={6}>irnabela@gmail.com</Grid>
              <Grid size={6}>Contact No</Grid>
              <Grid size={6}>016XXXXXXXX</Grid>
              <Grid size={6}>Address</Grid>
              <Grid size={6}>Apt. 738 2086 Marianne Parks</Grid>
              <Grid size={6}>Booking</Grid>
              <Grid size={6}>5</Grid>
              <Grid size={6}>Total Cost</Grid>
              <Grid size={6}>$1561</Grid>
              <Grid size={6}>Join Date</Grid>
              <Grid size={6}>27 Aug 2024</Grid>
            </Grid>
          </div>
          <h3 className="text-xl mb-3 font-semibold border-t border-slate-300 mt-5 pt-5">
            Cars Documents
          </h3>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="/folderIcon.png"
                alt=""
                className="w-7 h-7 object-cover"
              />
              <p>View</p>
            </div>

            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="/folderIcon.png"
                alt=""
                className="w-7 h-7 object-cover"
              />
              <p>Download</p>
            </div>
          </div>

          <Grid size={12}>
            <h1 className="text-green-700 text-2xl font-semibold mb-4 mt-8">
              Car List
            </h1>
            {carsData && carsData?.slice(0, 2)?.map((car: any) => <CarCard data={car} />)}
          </Grid>
        </Grid>
        <Grid size={6}>
          <h1 className="text-green-700 text-2xl font-semibold mb-4">
            Service List
          </h1>
          {carsData && carsData?.map((car: any) => <CarCard data={car} />)}
        </Grid>
      </Grid>
    </div>
  );
};

export default HostDetails;

const carsData = [
  {
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
    brand: "Mercedes Benz",
    area: "Banasree, Dhaka",
    rent: 100,
    rentWise: "Daily",
    rating: 4.5,
    status: "Complete",
  },
  {
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
    brand: "Toyota Corolla",
    area: "Uttara, Dhaka",
    rent: 80,
    rentWise: "Daily",
    rating: 4.3,
    status: "Pending",
  },
  {
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
    brand: "BMW X5",
    area: "Mirpur, Dhaka",
    rent: 120,
    rentWise: "Daily",
    rating: 4.7,
    status: "Complete",
  },
  {
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
    brand: "Audi A6",
    area: "Bashundhara, Dhaka",
    rent: 110,
    rentWise: "Daily",
    rating: 4.6,
    status: "In Progress",
  },
  {
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
    brand: "Honda Civic",
    area: "Dhanmondi, Dhaka",
    rent: 70,
    rentWise: "Daily",
    rating: 4.4,
    status: "Complete",
  },
];
