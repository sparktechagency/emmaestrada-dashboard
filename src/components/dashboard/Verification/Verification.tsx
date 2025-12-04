import React, { useEffect, useState } from "react";

import { Box, Button, InputAdornment, styled, TablePagination, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { getSearchParams } from "../../../utils/getSearchParams";
import { FaSearch } from "react-icons/fa";

const imageURL =
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg";
const hostImage = "/placeholder.png";

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

const hostsData = [
  {
    sl: 1,
    property: { name: "Mercedes-Benz", image: imageURL },
    host: { name: "Samuel Johnsons", image: hostImage, email: "abc@gmail.com" },

    location: "Buffalo, New York",
    status: "Completed",
  },
  {
    sl: 2,
    property: { name: "BMW X5", image: imageURL },
    host: { name: "Emily Carter", image: hostImage, email: "abc@gmail.com" },

    location: "Los Angeles, California",
    status: "Pending",
  },
  {
    sl: 3,
    property: { name: "Audi A6", image: imageURL },
    host: { name: "Michael Brown", image: hostImage, email: "abc@gmail.com" },

    location: "Miami, Florida",
    status: "Completed",
  },
  {
    sl: 4,
    property: { name: "Tesla Model 3", image: imageURL },
    host: { name: "Sophia Turner", image: hostImage, email: "abc@gmail.com" },

    location: "Dallas, Texas",
    status: "Cancelled",
  },
  {
    sl: 5,
    property: { name: "Lexus RX 350", image: imageURL },
    host: { name: "William Harris", image: hostImage, email: "abc@gmail.com" },

    location: "Seattle, Washington",
    status: "Completed",
  },
  {
    sl: 6,
    property: { name: "Toyota Supra", image: imageURL },
    host: { name: "Isabella Lewis", image: hostImage, email: "abc@gmail.com" },

    location: "Austin, Texas",
    status: "Pending",
  },
  {
    sl: 7,
    property: { name: "Ford Mustang", image: imageURL },
    host: { name: "James Wilson", image: hostImage, email: "abc@gmail.com" },

    location: "Denver, Colorado",
    status: "Completed",
  },
  {
    sl: 8,
    property: { name: "Chevrolet Camaro", image: imageURL },
    host: { name: "Olivia Martinez", image: hostImage, email: "abc@gmail.com" },

    location: "Chicago, Illinois",
    status: "Rejected",
  },
  {
    sl: 9,
    property: { name: "Honda Civic", image: imageURL },
    host: { name: "Benjamin Clark", image: hostImage, email: "abc@gmail.com" },

    location: "Phoenix, Arizona",
    status: "Completed",
  },
  {
    sl: 10,
    property: { name: "Porsche 911", image: imageURL },
    host: { name: "Charlotte White", image: hostImage, email: "abc@gmail.com" },

    location: "San Francisco, California",
    status: "Pending",
  },
  // {
  //   sl: 11,
  //   property: { name: "Nissan GTR", image: imageURL },
  //   host: { name: "Ethan Taylor", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Las Vegas, Nevada",
  //   status: "Completed",
  // },
  // {
  //   sl: 12,
  //   property: { name: "Jaguar XF", image: imageURL },
  //   host: { name: "Amelia Walker", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Portland, Oregon",
  //   status: "Cancelled",
  // },
  // {
  //   sl: 13,
  //   property: { name: "Volvo XC90", image: imageURL },
  //   host: { name: "Logan Davis", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Atlanta, Georgia",
  //   status: "Completed",
  // },
  // {
  //   sl: 14,
  //   property: { name: "Ferrari Roma", image: imageURL },
  //   host: { name: "Mia Robinson", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "New York City, New York",
  //   status: "Pending",
  // },
  // {
  //   sl: 15,
  //   property: { name: "Lamborghini Urus", image: imageURL },
  //   host: { name: "Alexander Thompson", image: hostImage, email: "abc@gmail.com", },
  //
  //   location: "Houston, Texas",
  //   status: "Completed",
  // },
];



const Verification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const [searchText, setSearchText] = useState("");
  
    const updateSearchParams = useUpdateSearchParams();
    const {searchTerm} = getSearchParams();
    
    
    useEffect(()=>{
  setSearchText(searchTerm)
    },[searchTerm]);
  
    const handleSearch = (e: any) => {
      const search = e.target.value;
      setSearchText(search);
      updateSearchParams({searchTerm: search})
    };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("event", event);
    
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <Box>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl text-primary font-semibold">Property List</h1>
        <div className="flex gap-5">


          <TextField
            placeholder="Search by name, email or service..."
            value={searchText}
            onChange={handleSearch}
            style={{ width: "325px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
              style: {
                borderRadius: "16px",
                //   @ts-ignore
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
        </div>
      </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Host Lists</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Files</StyledTableCell>
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

              {/* Host */}
              <TableCell align="left">
                <span>{row?.host?.email}</span>
              </TableCell>

              <TableCell component="th" scope="row">
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
              </TableCell>

              {/* Status */}
              <TableCell align="left">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor:
                      row.status.toLocaleLowerCase() === "completed"
                        ? "#008000"
                        : row.status.toLocaleLowerCase() === "pending"
                        ? "#ED6C02"
                        : row.status.toLocaleLowerCase() === "cancelled"
                        ? "#ff0000"
                        : "#F0F0F0",
                    color:
                      row.status.toLocaleLowerCase() === "completed"
                        ? "#ffffff"
                        : row.status.toLocaleLowerCase() === "pending"
                        ? "#ffffff"
                        : row.status.toLocaleLowerCase() === "cancelled"
                        ? "#ffffff"
                        : "#616161",
                    padding: "4px 12px",
                    borderRadius: 5,
                    boxShadow: "none",
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
    </Box>
  );
};

export default Verification;
