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
import { FaSearch } from "react-icons/fa";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { getSearchParams } from "../../../utils/getSearchParams";


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


const Payments = () => {
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
    console.log('event', event);
    
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
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Trans Id.</StyledTableCell>
            <StyledTableCell align="right">Booking Id</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {paymentHistory?.map((row, index) => (
            <StyledTableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Property */}
              <TableCell component="th" scope="row">
                {row?.date}
              </TableCell>

              {/* Host */}
              <TableCell align="left">
                <span>{row?.transId}</span>
              </TableCell>

              <TableCell component="th" scope="row">
                <span>#{row?.bookingId}</span>
              </TableCell>
              <TableCell component="th" scope="row">
                <span>{row?.bookingId}</span>
              </TableCell>

              {/* Status */}
              <TableCell align="left">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor:
                      row.status.toLocaleLowerCase() === "paid"
                        ? "#008000"
                        : row.status.toLocaleLowerCase() === "pending"
                        ? "#ED6C02"
                        : row.status.toLocaleLowerCase() === "failed"
                        ? "#ff0000"
                        : "#F0F0F0",
                    color:
                      row.status.toLocaleLowerCase() === "paid"
                        ? "#ffffff"
                        : row.status.toLocaleLowerCase() === "pending"
                        ? "#ffffff"
                        : row.status.toLocaleLowerCase() === "failed"
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
                  // onClick={() => setOpen(!open)}
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
        count={paymentHistory?.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer> 
    </Box>
  );
};

export default Payments;

const paymentHistory = [
  {
    sl: 1,
    date: "27 Aug 2024",
    transId: "VNS-5615111146",
    bookingId: 783.95,
    price: 150,
    status: "Paid",
  },
  {
    sl: 2,
    date: "02 Sep 2024",
    transId: "VNS-5615111147",
    bookingId: 850.5,
    price: 150,
    status: "Pending",
  },
  {
    sl: 3,
    date: "08 Sep 2024",
    transId: "VNS-5615111148",
    bookingId: 690.75,
    price: 150,
    status: "Paid",
  },
  {
    sl: 4,
    date: "15 Sep 2024",
    transId: "VNS-5615111149",
    bookingId: 910.25,
    price: 150,
    status: "Failed",
  },
  {
    sl: 5,
    date: "20 Sep 2024",
    transId: "VNS-5615111150",
    bookingId: 1205.1,
    price: 150,
    status: "Paid",
  },
  {
    sl: 6,
    date: "25 Sep 2024",
    transId: "VNS-5615111151",
    bookingId: 745.6,
    price: 150,
    status: "Refunded",
  },
  {
    sl: 7,
    date: "01 Oct 2024",
    transId: "VNS-5615111152",
    bookingId: 860.0,
    price: 150,
    status: "Paid",
  },
  {
    sl: 8,
    date: "07 Oct 2024",
    transId: "VNS-5615111153",
    bookingId: 1020.35,
    price: 150,
    status: "Pending",
  },
  {
    sl: 9,
    date: "13 Oct 2024",
    transId: "VNS-5615111154",
    bookingId: 695.25,
    price: 150,
    status: "Paid",
  },
  {
    sl: 10,
    date: "18 Oct 2024",
    transId: "VNS-5615111155",
    bookingId: 1340.8,
    price: 150,
    status: "Paid",
  },
  {
    sl: 11,
    date: "24 Oct 2024",
    transId: "VNS-5615111156",
    bookingId: 980.5,
    price: 150,
    status: "Failed",
  },
  {
    sl: 12,
    date: "28 Oct 2024",
    transId: "VNS-5615111157",
    bookingId: 1115.45,
    price: 150,
    status: "Paid",
  },
];
