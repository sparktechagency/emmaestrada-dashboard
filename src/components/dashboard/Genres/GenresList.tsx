
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

const GenresList = ({ data }: { data: any[] }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, background: "var(--color-cardBg)" }}>
                <TableHead>
                    <StyledRow>
                        <StyledHeadCell>Sl No</StyledHeadCell>
                        <StyledHeadCell>Name</StyledHeadCell>
                        <StyledHeadCell>Counnt</StyledHeadCell>
                        <StyledHeadCell>Action</StyledHeadCell>
                    </StyledRow>
                </TableHead>

                <TableBody>
                    {data && data?.map((row: any, index: number) => (
                        <StyledRow key={index}>
                            {/* Title */}
                            <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                            <TableCell sx={{ color: "white" }}>{row?.name}</TableCell>
                            <TableCell sx={{ color: "white" }}>{row?.count}</TableCell>
                            <TableCell >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    <FaEdit size={18} className="text-green-400 cursor-pointer"
                                    />

                                    <FaTrashAlt size={18} className="text-red-500 cursor-pointer"
                                    />
                                </Box>
                            </TableCell>
                        </StyledRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default GenresList