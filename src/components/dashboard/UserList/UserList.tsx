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
  TableRow,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";

import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { IoEyeOutline } from "react-icons/io5";

import Swal from "sweetalert2";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useGetUsersQuery, useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { FormatDate } from "../../shared/FormatDate";
import SharedInput from "../../shared/SharedInput";
import UserDetailsModal from "./UserDetailsModal";
import { PiUserCircleBold, PiUserSoundBold } from "react-icons/pi";

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
const UsersList = () => {
  const { page } = getSearchParams();
  
  // @ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(1, page || 1));
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const { data: usersData, refetch } = useGetUsersQuery({});
  const [updateUser] = useUpdateUserMutation()

  const [searchText, setSearchText] = useState("");  

  const updateSearchParams = useUpdateSearchParams();
  const { searchTerm } = getSearchParams();

  useEffect(() => {
    setSearchText(searchTerm);
    refetch()
  }, [searchTerm]);

  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchText(search);
    updateSearchParams({ searchTerm: search })
  };

  useEffect(() => {
    // @ts-ignore
    const urlPage = Math.max(1, page || 1);
    setCurrentPage(urlPage);
    refetch();
  }, [page, refetch]);

  const handleChangePage = (__event: unknown, newPage: number) => {
    setCurrentPage(newPage);
    updateSearchParams({ page: newPage });
  };

  const handleToggleStatusPage = async (status: string, id: string, userName: string) => {    
    const isBlocking = status === "blocked";
    
    const result = await Swal.fire({
      title: isBlocking ? "Block User?" : "Unblock User?",
      html: isBlocking
    ? `Are you sure you want to block 
        <span class="text-primary font-semibold">${userName}</span>? 
        <br/>They will lose access to the platform.`
    : `Are you sure you want to unblock 
        <span class="text-primary font-semibold">${userName}</span>? 
        <br/>They will regain access to the platform.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocking ? "#d33" : "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: isBlocking ? "Yes, block user" : "Yes, unblock user",
      cancelButtonText: "Cancel",
      background: "var(--color-cardBg)",
      color: "white",
    });

    if (result.isConfirmed) {
      try {
        await updateUser({ status, id }).unwrap();
        refetch();
        
        Swal.fire({
          title: isBlocking ? "Blocked!" : "Unblocked!",
          text: isBlocking 
            ? `${userName} has been blocked successfully.`
            : `${userName} has been unblocked successfully.`,
          icon: "success",
          confirmButtonColor: "#F39C12",
          background: "var(--color-cardBg)",
          color: "white",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          background: "var(--color-cardBg)",
          color: "white",
        });
      }
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={600} color="white">
          Campaign Planner Management
        </Typography>
        <div className="flex gap-5">
          <SharedInput width={350} onChange={handleSearch} placeholder="Search by name, email"/>
        </div>
      </Box>

      <TableContainer component={Paper} className="bg-transparent!">
        <Table sx={{ minWidth: 650, background: "var(--color-cardBg)" }}>
          <TableHead>
            <StyledRow>
              <StyledHeadCell>User</StyledHeadCell>
              <StyledHeadCell>Role</StyledHeadCell>
              <StyledHeadCell>Join Date</StyledHeadCell>
              <StyledHeadCell>Status</StyledHeadCell>
              <StyledHeadCell>Actions</StyledHeadCell>
            </StyledRow>
          </TableHead>

          <TableBody>
            {usersData?.data && usersData?.data?.map((row: any, index: number) => (
              <StyledRow key={index}>
                {/* USER: Avatar + Name + Email*/}
                <TableCell sx={{ color: "white" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={`${imageUrl + row.image}`}
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
                    {row.role === "CREATOR" ? (
                      <PiUserSoundBold size={18} color="#ff6b35" />
                    ) : (
                      <PiUserCircleBold size={18} color="#ff6b35" />
                    )}
                    {row.role}
                  </Box>
                </TableCell>

                {/* JOIN DATE */}
                <TableCell sx={{ color: "white" }}>{FormatDate(row.createdAt)}</TableCell>
                
                {/* STATUS */}
                <TableCell>
                  <span
                    style={{
                      backgroundColor:
                        row.status === "active" ? "#E6F7E6" : "#FF5C5C",
                      color: row.status === "active" ? "#2E7D32" : "#FFF",
                      padding: "5px 15px",
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {row.status}
                  </span>
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
                      onClick={() => { setOpenDetails(true); setSelectedUser(row) }}
                    />
                    {row.status === "active" ?
                      <LockKeyhole 
                        size={20}
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleToggleStatusPage("blocked", row?._id, row?.name ?? row?.userName)} 
                      />
                      : 
                      <LockKeyholeOpen 
                        size={20}
                        className="text-green-400 cursor-pointer"
                        onClick={() => handleToggleStatusPage("active", row?._id, row?.name ?? row?.userName)} 
                      />
                    }  
                                      
                  </Box>
                </TableCell>
              </StyledRow>
            ))}
          </TableBody>
        </Table>

        <Stack alignItems="center" mt={4} color="white">
          <Pagination
            sx={{
              backgroundColor: "transparent",
              "& .MuiPaginationItem-text": {
                color: "rgba(255,255,255,.3)",
                border: "1px solid rgba(255,255,255,.3)",
              },
              "& .Mui-selected": {
                backgroundColor: "#F39C12 !important",
                color: "#000 !important",
                border: "1px solid #F39C12",
              },
              "& .MuiPaginationItem-previousNext": {
                color: "#F39C12",
                border: "1px solid #F39C12",
              },
              "& .MuiPaginationItem-previousNext:hover": {
                backgroundColor: "rgba(243,156,18,0.15)",
              },
            }}
            count={Math.ceil(usersData?.meta?.total / usersData?.meta?.limit)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>

        <UserDetailsModal 
          open={openDetails} 
          userId={(selectedUser as any)?._id} 
          onClose={() => { setOpenDetails(false); setSelectedUser(null) }} 
        />

      </TableContainer>
    </Box>
  );
};

export default UsersList;