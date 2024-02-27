
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
    const { user, setUser, userDataLoading } = useUser();
    const data = [
        { firstName: "Jeremy", lastName: "Smith", username: "jeremysmith", score: 100 },
        { firstName: "John", lastName: "Doe", username: "johndoe", score: 90 },
        { firstName: "Jane", lastName: "Doe", username: "janedoe", score: 80 },
        { firstName: "John", lastName: "Smith", username: "johnsmith", score: 70 },
        { firstName: "Jane", lastName: "Smith", username: "janesmith", score: 60 },
        { firstName: "John", lastName: "Doe", username: "johndoe", score: 50 },
        { firstName: "Jane", lastName: "Doe", username: "janedoe", score: 40 },
        { firstName: "John", lastName: "Smith", username: "johnsmith", score: 30 },
        { firstName: "Jane", lastName: "Smith", username: "janesmith", score: 20 },
        { firstName: "John", lastName: "Doe", username: "johndoe", score: 10 }
    ];

    ApiClient.api.getTopTen(user).then((res) => {
        console.log(res);

    }).catch((error) => {
        console.log(error);
    });

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
                            <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell className="rank" padding="checkbox">{index + 1}</StyledTableCell>
                                <StyledTableCell>{item.firstName + " " + item.lastName}</StyledTableCell>
                                <StyledTableCell>{item.username}</StyledTableCell>
                                <StyledTableCell>{item.score}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </>
    );
}

export default Leaderboard;