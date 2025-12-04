import React, { useState } from "react";
import { IconButton, styled, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
  }
  ,
  {
    sl: 2,
    property: { name: "BMW X5", image: imageURL },
    host: { name: "Emily Carter", image: hostImage, email: "abc@gmail.com" },
    location: "Los Angeles, California",
    status: "Pending",
  },  
];

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GuestList = ({ open, setOpen }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
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
      <Table
        sx={{
          minWidth: 650,
          backgroundColor: "var(--color-cardBg)",
          color: "var(--color-textColor)",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Host Lists</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {hostsData
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--color-textColor)",
                  }}
                >
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
                </TableCell>

                <TableCell
                  align="left"
                  sx={{ color: "var(--color-textColor)" }}
                >
                  {row.host.email}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "var(--color-textColor)" }}
                >
                  {row.location}
                </TableCell>

                <TableCell
                  align="left"
                  sx={{ color: "var(--color-textColor)" }}
                >
                  <span
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
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {row.status}
                  </span>
                </TableCell>

                <TableCell align="left">
                  <RemoveRedEyeOutlinedIcon
                    className="cursor-pointer text-[var(--color-textColor)]"
                    onClick={() => setOpen(!open)}
                    fontSize="medium"
                  />
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={hostsData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "var(--color-cardBg)",
          color: "var(--color-textColor)",
        }}
        ActionsComponent={(props) => {
          const { count, page, onPageChange, rowsPerPage } = props;

          // Disable the prev and next buttons when at the start or end
          const disabledPrev = page === 0;
          const disabledNext = page >= Math.ceil(count / rowsPerPage) - 1;

          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => onPageChange(null, page - 1)}
                disabled={disabledPrev}
                sx={{
                  color: disabledPrev ? "#ededed" : "var(--color-textColor)",
                  cursor: disabledPrev ? "not-allowed" : "pointer",
                }}
              >
                <IoIosArrowBack />
              </IconButton>
              <span>
                 {Math.ceil(count / rowsPerPage)}
              </span>
              <IconButton
                onClick={() => onPageChange(null, page + 1)}
                disabled={disabledNext}
                sx={{
                  color: disabledNext ? "#ededed" : "var(--color-textColor)",
                  cursor: disabledNext ? "not-allowed" : "pointer",
                }}
              >
                <IoIosArrowForward />
              </IconButton>
            </div>
          );
        }}
      />
    </TableContainer>
  );
};

export default GuestList;
