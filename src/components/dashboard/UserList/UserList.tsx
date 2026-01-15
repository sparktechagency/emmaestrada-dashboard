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
import { useEffect, useState } from "react";

import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { IoEyeOutline } from "react-icons/io5";
import { PiUserCircleBold, PiUserSoundBold } from "react-icons/pi"; // Artist icon
import { toast } from "sonner";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useGetUsersQuery, useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { FormatDate } from "../../shared/FormatDate";
import ConfirmModal from "../../UI/ConfirmModel";
import UserDetailsModal from "./UserDetailsModal";

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
const UsersList = () => {
  const { page } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  // @ts-ignore
  const [currentPage, setCurrentPage] = useState(Math.max(1, page || 1));
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { data: usersData, refetch } = useGetUsersQuery({});
  const [updateUser] = useUpdateUserMutation()

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

  const handleToggleStatusPage = async (status: string, id: string) => {
    try {
      await updateUser({ status, id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      // const res = await deleteUser(selectedUser._id).unwrap();

      // console.log("delete", res);
      toast.success("Admin deleted successfully");
      // refetch();
      setSelectedUser(null);
      setOpenConfirmModal(false);
    } catch (error: any) {
      console.log("delete error", error);
      toast.error(error?.data?.message || "Failed to delete admin");
    }
  };
  return (
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
                  {row.role === "Artist" ? (
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
                      row.status === "active" ? "#E6F7E6" : "#4a4d52",
                    color: row.status === "active" ? "#2E7D32" : "#d5d7da",
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
                    <LockKeyhole size={20}
                      className="text-red-400 cursor-pointer"
                      onClick={() => { handleToggleStatusPage("blocked", row?._id) }} />
                    : <LockKeyholeOpen className="text-green-400 cursor-pointer"
                      onClick={() => { handleToggleStatusPage("active", row?._id) }} />}
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

      <UserDetailsModal open={openDetails} userId={(selectedUser as any)?._id} onClose={() => { setOpenDetails(false); setSelectedUser(null) }} />

      <ConfirmModal
        open={openConfirmModal}
        title={`Delete ${(selectedUser as any)?.name}"`}
        content={`Are you sure you want to delete "${(selectedUser as any)?.name}"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteAdmin}
        onCancel={() => {
          setOpenConfirmModal(false);
          setSelectedUser(null);
        }}
      />
    </TableContainer>
  );
};

export default UsersList;
