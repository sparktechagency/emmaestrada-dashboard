import {
  Avatar,
  Button,
  ImageList,
  ImageListItem,
  Table
} from "@mui/material";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { CiWifiOn } from "react-icons/ci";
import { IoGiftOutline } from "react-icons/io5";
import { LuMonitor } from "react-icons/lu";
import { TbAirConditioning, TbCat } from "react-icons/tb";

type props = {  
  items: any
};

const CarDetails = ({  items }: props) => {
  

  const lastItem = items[items?.length - 1];

  const featuresData = {
    carId: "Yes",
    totalTrips: 150,
    rating: 4.5,
    location: "Amsterdam, Netherlands",
    carType: "Compact Sedan",
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    airCondition: "Yes",
    gpsNavigation: "Yes",
    mileage: "unlimited",
    bluetooth: "Yes",
    description:
      "This compact sedan is perfect for exploring Amsterdam and its surroundings. Featuring a fuel-efficient engine, comfortable seating for up to 4 people, and modern amenities like GPS and Bluetooth, it’s the ideal choice for travelers looking for convenience and comfort. Enjoy a flexible rental period with unlimited mileage, and the peace of mind with included insurance. Pickup and drop-off at a central location for ease.",
    facilities: [
      { icon: <IoGiftOutline />, name: "Newest" },
      { icon: <CiWifiOn />, name: "Wifi" },
      { icon: <TbCat />, name: "Pet Allow" },
      { icon: <TbAirConditioning />, name: "AC" },
      { icon: <LuMonitor />, name: "TV" },
      { icon: <AiOutlineSecurityScan />, name: "Security" },
    ],
  };

  return (
    <div className="bg-[var(--color-cardBg)] text-[#bebcbc] shadow p-5">
      <div className="flex items-center justify-between mb-5  !h-full">
        <h1 className="text-3xl font-semibold">Car Details</h1>
        <div className="flex gap-5">
          <Button
            size="large"
            variant="contained"
            sx={{ background: "var(--color-yellow)" }}
          >
            Upcoming
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-7">
        <Avatar
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/10928778/pexels-photo-10928778.jpeg"
          sx={{ width: 56, height: 56 }}
        />
        <p className="text-lg font-medium">Host By Jack Dawson</p>
      </div>

      <ImageList sx={{ display: "flex", gap: 0, width: "100%", height: 300 }}>
        {items &&
          items?.slice(0, 3)?.map((item: any) => (
            <ImageListItem key={item.img} sx={{ marginRight: 2 }}>
              <img
                src={`${item.img}?w=400&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                className="object-cover rounded-3xl"
              />
            </ImageListItem>
          ))}

        <ImageListItem sx={{ position: "relative" }}>
          <img
            srcSet={`${lastItem?.img}?w=400&fit=crop&auto=format&dpr=2 2x`}
            src={`${lastItem?.img}?w=400&fit=crop&auto=format`}
            alt={lastItem?.title}
            loading="lazy"
            className="object-cover rounded-3xl"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center text-3xl text-white rounded-3xl">
            {items?.length - 3}+ 
          </div>
        </ImageListItem>
      </ImageList>

      <div className="flex items-center justify-between py-5">
        <h3 className="text-2xl font-semibold">
          Cozy 2BR Apartment in Florence
        </h3>
        <h3 className="text-2xl font-semibold">$250/PW</h3>
      </div>
      <p className="text-xl font-semibold">Features</p>

      <Table>
        {/* ✅ Add Features Data Section */}
        <tbody>
          <tr>
            <td colSpan={2}>
              <h4 style={{ fontWeight: 600, marginTop: 12 }}>Car Features</h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 8,
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <p>Car ID:</p>
                    </td>
                    <td>{featuresData.carId}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Total Trips:</p>
                    </td>
                    <td>{featuresData.totalTrips}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Rating:</p>
                    </td>
                    <td>{featuresData.rating}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Location:</p>
                    </td>
                    <td>{featuresData.location}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Car Type:</p>
                    </td>
                    <td>{featuresData.carType}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Seats:</p>
                    </td>
                    <td>{featuresData.seats}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Transmission:</p>
                    </td>
                    <td>{featuresData.transmission}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Fuel Type:</p>
                    </td>
                    <td>{featuresData.fuelType}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Air Condition:</p>
                    </td>
                    <td>{featuresData.airCondition}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>GPS Navigation:</p>
                    </td>
                    <td>{featuresData.gpsNavigation}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Mileage:</p>
                    </td>
                    <td>{featuresData.mileage}</td>
                  </tr>
                  <tr>
                    <td>
                      <p>Bluetooth:</p>
                    </td>
                    <td>{featuresData.bluetooth}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <p>Description:</p>
                      <p style={{ marginTop: 6, color: "#ffffff" }}>
                        {featuresData.description}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Facilities:</strong>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                          marginTop: 15,
                        }}
                      >
                        {featuresData?.facilities?.map((item, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              borderRadius: "6px",
                              padding: "4px 8px",
                            }}
                            className="bg-white text-slate-700"
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </Table>

      <h3 className="text-xl mb-3 font-semibold border-t border-slate-300 mt-5 pt-5">Cars Documents</h3>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 cursor-pointer">
          <img src="/folderIcon.png" alt="" className="w-7 h-7 object-cover"/>
          <p>View</p>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <img src="/folderIcon.png" alt="" className="w-7 h-7 object-cover"/>
          <p>Download</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
