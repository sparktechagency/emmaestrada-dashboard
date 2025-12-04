import React, { useState } from "react";

import { Button, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const imageURL =
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg";
const hostImage = "/placeholder.png";
const guestImage = "/profile14.jpg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CF9702",
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: 18,
    textAlign: "start",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    paddingTop: 12,
    paddingBottom: 12,
  },
}));



type props = {
  open: boolean;
  setOpen: any;
};

const BookingList = ({ open, setOpen }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('event', event)
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Booking Id</StyledTableCell>
            <StyledTableCell>Guest</StyledTableCell>
            <StyledTableCell>Host</StyledTableCell>            
            <StyledTableCell align="right">Car</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {hostsData?.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left"><span>#{row?.bookingId + index}</span></TableCell>

              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src={row.guest.image}
                    alt={row.guest.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <span>{row.guest.name}</span>
                </div>
              </TableCell>
              {/* Property */}
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src={row.host.image}
                    alt={row.host.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <span>{row.property.name}</span>
                </div>
              </TableCell>

              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img
                    src={row.property.image}
                    alt={row.property.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <span>{row.property.name}</span>
                </div>
              </TableCell>             

              {/* Status */}
              <TableCell >
                <Button variant="contained"
                  style={{
                    backgroundColor:
                      row.status === "Completed"
                        ? "#E6F7E6"
                        : row.status === "Pending"
                        ? "#FFF4E6"
                        : row.status === "Cancelled"
                        ? "#FFE6E6"
                        : "#F0F0F0",
                    color:
                      row.status === "Completed"
                        ? "#2E7D32"
                        : row.status === "Pending"
                        ? "#ED6C02"
                        : row.status === "Cancelled"
                        ? "#D32F2F"
                        : "#616161",
                    padding: "4px 12px",
                    borderRadius: 5,
                    boxShadow: 'none',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {row.status}
                </Button>
              </TableCell>
              {/* Location */}
              <TableCell align="left">
                {" "}
                <RemoveRedEyeOutlinedIcon
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                  fontSize="medium"
                />{" "}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={hostsData?.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default BookingList;


const hostsData = [
  {
    sl: 1,
    bookingId: "51564",
    property: { name: "Mercedes-Benz", image: imageURL },
    host: { name: "Samuel Johnsons", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Buffalo, New York",
    status: "Completed",
  },
  {
    sl: 2,
    bookingId: "51564",
    property: { name: "BMW X5", image: imageURL },
    host: { name: "Emily Carter", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Los Angeles, California",
    status: "Pending",
  },
  {
    sl: 3,
    bookingId: "51564",
    property: { name: "Audi A6", image: imageURL },
    host: { name: "Michael Brown", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Miami, Florida",
    status: "Completed",
  },
  {
    sl: 4,
    bookingId: "51564",
    property: { name: "Tesla Model 3", image: imageURL },
    host: { name: "Sophia Turner", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Dallas, Texas",
    status: "Cancelled",
  },
  {
    sl: 5,
    bookingId: "51564",
    property: { name: "Lexus RX 350", image: imageURL },
    host: { name: "William Harris", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Seattle, Washington",
    status: "Completed",
  },
  {
    sl: 6,
    bookingId: "51564",
    property: { name: "Toyota Supra", image: imageURL },
    host: { name: "Isabella Lewis", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Austin, Texas",
    status: "Pending",
  },
  {
    sl: 7,
    bookingId: "51564",
    property: { name: "Ford Mustang", image: imageURL },
    host: { name: "James Wilson", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Denver, Colorado",
    status: "Completed",
  },
  {
    sl: 8,
    bookingId: "51564",
    property: { name: "Chevrolet Camaro", image: imageURL },
    host: { name: "Olivia Martinez", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Chicago, Illinois",
    status: "Rejected",
  },
  {
    sl: 9,
    bookingId: "51564",
    property: { name: "Honda Civic", image: imageURL },
    host: { name: "Benjamin Clark", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "Phoenix, Arizona",
    status: "Completed",
  },
  {
    sl: 10,
    bookingId: "51564",
    property: { name: "Porsche 911", image: imageURL },
    host: { name: "Charlotte White", image: hostImage, email: "abc@gmail.com" },
    guest: { name: "Samuel Johnsons", image: guestImage, email: "abc@gmail.com" },

    location: "San Francisco, California",
    status: "Pending",
  },
  // {
  //   sl: 11,
  // bookingId: "51564",
  //   property: { name: "Nissan GTR", image: imageURL },
  //   host: { name: "Ethan Taylor", image: hostImage, email: "abc@gmail.com", },
  //   guest: { name: "Ethan Taylor", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Las Vegas, Nevada",
  //   status: "Completed",
  // },
  // {
  //   sl: 12,
  // bookingId: "51564",
  //   property: { name: "Jaguar XF", image: imageURL },
  //   host: { name: "Amelia Walker", image: hostImage, email: "abc@gmail.com", },
  //   guest: { name: "Amelia Walker", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Portland, Oregon",
  //   status: "Cancelled",
  // },
  // {
  //   sl: 13,
  // bookingId: "51564",
  //   property: { name: "Volvo XC90", image: imageURL },
  //   host: { name: "Logan Davis", image: hostImage, email: "abc@gmail.com", },
  //   guest: { name: "Logan Davis", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Atlanta, Georgia",
  //   status: "Completed",
  // },
  // {
  //   sl: 14,
  // bookingId: "51564",
  //   property: { name: "Ferrari Roma", image: imageURL },
  //   host: { name: "Mia Robinson", image: hostImage, email: "abc@gmail.com", },
  //   guest: { name: "Mia Robinson", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "New York City, New York",
  //   status: "Pending",
  // },
  // {
  //   sl: 15,
  // bookingId: "51564",
  //   property: { name: "Lamborghini Urus", image: imageURL },
  //   host: { name: "Alexander Thompson", image: hostImage, email: "abc@gmail.com", },
  //   guest: { name: "Alexander Thompson", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Houston, Texas",
  //   status: "Completed",
  // },
];