import {
  Box,
  Pagination,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useState } from "react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { PiUserCircleBold, PiUserSoundBold } from "react-icons/pi"; // Artist icon

// --------- SAMPLE USER DATA ----------

// ------------------ TABLE STYLES -------------------
const StyledHeadCell = styled(TableCell)(() => ({
  backgroundColor: "var(--color-primary)",
  color: "white",
  fontSize: 17,
  fontWeight: 600,
}));

const StyledRow = styled(TableRow)(() => ({
  "& td, & th": {
    paddingTop: 14,
    paddingBottom: 14,
  },
}));

// ---------------- USER LIST COMPONENT ----------------
const UsersList = ({
  search,
  setOpenDetails,
  setOpenConfirmModal,
  setSelectedUser,
}: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  return (
    <TableContainer component={Paper} className="bg-transparent!">
      <Table sx={{ minWidth: 650, background: "var(--color-cardBg)" }}>
        <TableHead>
          <StyledRow>
            <StyledHeadCell>User</StyledHeadCell>
            <StyledHeadCell>Role</StyledHeadCell>
            <StyledHeadCell>Status</StyledHeadCell>
            <StyledHeadCell>Join Date</StyledHeadCell>
            <StyledHeadCell>Stats</StyledHeadCell>
            <StyledHeadCell>Actions</StyledHeadCell>
          </StyledRow>
        </TableHead>

        <TableBody>
          {usersData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any, index: number) => (
              <StyledRow key={index}>
                {/* USER: Avatar + Name + Email*/}
                <TableCell sx={{ color: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={row.avatar}
                      alt={row.name}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />

                    <Box>
                      <p style={{ fontWeight: 600 }}>{row.name}</p>
                      <p style={{ fontSize: 13, opacity: 0.7 }}>{row.email}</p>
                    </Box>
                  </Box>
                </TableCell>

                {/* ROLE */}
                <TableCell sx={{ color: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {row.role === "Artist" ? (
                      <PiUserSoundBold size={18} color="#ff6b35" />
                    ) : (
                      <PiUserCircleBold size={18} color="#ff6b35" />
                    )}
                    {row.role}
                  </Box>
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <span
                    style={{
                      backgroundColor:
                        row.status === "Active" ? "#E6F7E6" : "#4a4d52",
                      color: row.status === "Active" ? "#2E7D32" : "#d5d7da",
                      padding: "5px 15px",
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {row.status}
                  </span>
                </TableCell>

                {/* JOIN DATE */}
                <TableCell sx={{ color: "white" }}>{row.joinDate}</TableCell>

                {/* STATS */}
                <TableCell sx={{ color: "white" }}>
                  <div style={{ opacity: 0.7, fontSize: 14 }}>
                    {row.statsLabel}
                  </div>
                  <div style={{ fontWeight: 600 }}>{row.statsValue}</div>
                </TableCell>

                {/* ACTION ICONS */}
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <IoEyeOutline
                      size={20}
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
                        setSelectedUser(row);
                      }}
                    />
                  </Box>
                </TableCell>
              </StyledRow>
            ))}
        </TableBody>
      </Table>

      {/* <TablePagination
        component="div"
        count={usersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        sx={{ background: "var(--color-cardBg)", color: "#ededed" }}
      /> */}

      <Stack alignItems="center" mt={4} color="white">
        <Pagination
          sx={{
            "& .MuiPaginationItem-text": {
              color: "rgba(255,255,255,.3)",          // icon color
              border: "1px solid rgba(255,255,255,.3)",
            },
            "& .MuiPaginationItem-previousNext": {
              color: "#F39C12",          // icon color
              border: "1px solid #F39C12",
            },
            "& .MuiPaginationItem-previousNext:hover": {
              backgroundColor: "rgba(243,156,18,0.15)",
            },
          }}
          count={Math.ceil(usersData?.length / rowsPerPage)} // total pages
          page={page + 1}                                      // MUI starts pages from 1
          onChange={(_, value) => setPage(value - 1)}          // convert back to 0-based
          color="primary"
        />
      </Stack>
    </TableContainer>
  );
};

export default UsersList;


const usersData = [
  {
    avatar: "/profile14.jpg",
    name: "DJ Sunset",
    email: "dj.sunset@email.com",
    role: "Artist",
    joinDate: "2024-01-15",
    status: "Active",
    statsLabel: "12 campaigns",
    statsValue: "$45,000",
  },
  {
    avatar: "/profile14.jpg",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "Influencer",
    joinDate: "2024-02-20",
    status: "Active",
    statsLabel: "28 requests",
    statsValue: "125K • 8.5%",
  },
  {
    avatar: "/profile14.jpg",
    name: "The Midnight Band",
    email: "midnight@email.com",
    role: "Artist",
    joinDate: "2024-01-10",
    status: "Active",
    statsLabel: "8 campaigns",
    statsValue: "$38,000",
  },
  {
    avatar: "/profile14.jpg",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    role: "Influencer",
    joinDate: "2024-03-05",
    status: "Active",
    statsLabel: "34 requests",
    statsValue: "250K • 12.3%",
  },
  {
    avatar: "/profile14.jpg",
    name: "Emma Davis",
    email: "emma.d@email.com",
    role: "Influencer",
    joinDate: "2024-02-28",
    status: "Inactive",
    statsLabel: "15 requests",
    statsValue: "85K • 6.8%",
  },
  {
    avatar: "/profile14.jpg",
    name: "Rising Star",
    email: "risingstar@email.com",
    role: "Artist",
    joinDate: "2024-01-20",
    status: "Active",
    statsLabel: "15 campaigns",
    statsValue: "$32,000",
  },
];
