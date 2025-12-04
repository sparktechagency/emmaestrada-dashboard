import React, { useState } from "react";
import {
  styled,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

import { FaEye, FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import { movieAndSeriesData } from "../../../assets/ContentData";
import { IoEyeOutline } from "react-icons/io5";

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#CF9702",
  color: "white",
  fontSize: 17,
  fontWeight: 600,
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  "& td, & th": {
    paddingTop: 12,
    paddingBottom: 12,
  },
}));

const MovieSeriesTable = ({ search, setOpenDetails, setOpenConfirmModal, setSelectedContent }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = movieAndSeriesData?.filter((item: any) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, background: "var(--color-cardBg)" }}>
        <TableHead>
          <StyledRow>
            <StyledHeadCell>Poster</StyledHeadCell>
            <StyledHeadCell>Title</StyledHeadCell>
            <StyledHeadCell>Type</StyledHeadCell>
            <StyledHeadCell>Genre</StyledHeadCell>
            <StyledHeadCell>Upload Date</StyledHeadCell>
            <StyledHeadCell>Views</StyledHeadCell>
            <StyledHeadCell>Status</StyledHeadCell>
            <StyledHeadCell>Action</StyledHeadCell>
          </StyledRow>
        </TableHead>

        <TableBody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any, index: number) => (
              <StyledRow key={index}>
                {/* Poster */}
                <TableCell>
                  <img
                    src={row?.poster}
                    alt={row?.title}
                    style={{
                      width: 45,
                      height: 60,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                  />
                </TableCell>

                {/* Title */}
                <TableCell sx={{ color: "white" }}>{row?.title}</TableCell>

                {/* Type */}
                <TableCell sx={{ color: "white" }}>{row?.type}</TableCell>

                {/* Genre */}
                <TableCell sx={{ color: "white" }}>{row?.genre}</TableCell>

                {/* Upload Date */}
                <TableCell sx={{ color: "white" }}>{row?.uploadDate}</TableCell>

                {/* Views */}
                <TableCell sx={{ color: "white" }}>
                  {row?.views} views
                </TableCell>

                {/* Status */}
                <TableCell>
                  <span
                    style={{
                      backgroundColor:
                        row?.status === "Active" ? "#E6F7E6" : "#FFE6E6",
                      color: row?.status === "Active" ? "#2E7D32" : "#D32F2F",
                      padding: "5px 12px",
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {row?.status}
                  </span>
                </TableCell>

                {/* Action Icons */}
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <IoEyeOutline
                      size={18}
                      className="text-blue-400 cursor-pointer"
                      onClick={() => setOpenDetails(true)}
                    />

                    <FaEdit
                      size={18}
                      className="text-green-400 cursor-pointer"
                    />

                    <FaTrashAlt
                      size={18}
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        setOpenConfirmModal(true);
                        setSelectedContent(row);
                      }}
                    />
                  </Box>
                </TableCell>
              </StyledRow>
            ))}
        </TableBody>

      </Table>

      <TablePagination
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        sx={{ background: "var(--color-cardBg)", color: "#ededed" }}
      />
    </TableContainer>
  );
};

export default MovieSeriesTable;
