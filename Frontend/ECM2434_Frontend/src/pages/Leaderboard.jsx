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
    const [loadingUserData, setLoadingUserData] = useState(true); // Initialize the loading state to true

    useEffect(() => {
        // Define the function to fetch data inside useEffect
        const fetchData = async () => {
            try {
                if (user) { // Check if user data and token are loaded
                    const res = await ApiClient.api.getTopTen(user);
                    console.log(res);
                    setData(res); // Update the state with the fetched data
                }
            } catch (error) {
                console.log(error)
                console.error("Failed to fetch leaderboard data:", error);
            } finally {
                setLoadingUserData(false); // Ensure loading is set to false after the fetch attempt
            }
        };

        if (user) { // Only attempt to fetch data if the user object is truthy
            fetchData();
        }

    }, [user]); // Dependency array: the effect runs when the `user` object changes


    return (
        <>
            {loadingUserData ? (
                <p>Loading...</p>
            ) : (
                <div className="formater">
                    <TableContainer component={Paper} className='tableContainer'>
                        <StyledTable sx={{ width: 650, color: "ActiveBorder" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell padding="checkbox">Level</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Username</StyledTableCell>
                                    <StyledTableCell>XP</StyledTableCell>
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
                </div>
            )}
        </>
    );
}

export default Leaderboard;