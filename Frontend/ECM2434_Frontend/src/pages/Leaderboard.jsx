
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ApiClient from "../api/index";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useUser } from '../contexts/userContext';
import React, { useState, useEffect } from 'react';


import './leaderboard.css';

const StyledTable = styled(Table)(() => ({
    [`&.MuiTable-root`]: {
        width: "100%",
        margin: "auto",
        border: "1px solid black",
        borderRadius: 3,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#245D3D",
        color: theme.palette.common.white,
        textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: "center", // Center the content
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#EAFCE8",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: "1px solid #245D3D",
    },
}));


const Leaderboard = () => {
    const { user } = useUser(); // Assuming useUser() returns the current user context
    const [data, setData] = useState([]); // Initialize the data state to an empty array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApiClient.api.getTopTen(user);
                setData(res); // Update the state with the fetched data
            } catch (error) {
                console.error("Failed to fetch leaderboard data:", error);
            }
        };

        fetchData();
    }, [user]); // Dependency array: the effect runs when the `user` object changes

    return (
        <>
            <TableContainer component={Paper} className='tableContainer'>
                <StyledTable sx={{ width: 650, color: "ActiveBorder" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">Rank</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Level</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <StyledTableRow key={item.id || index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell className="rank" padding="checkbox">{item.rank || index + 1}</StyledTableCell>
                                <StyledTableCell>{item.first_name + " " + item.last_name}</StyledTableCell>
                                <StyledTableCell>{item.username}</StyledTableCell>
                                <StyledTableCell>{item.XP}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </>
    );
}

export default Leaderboard;