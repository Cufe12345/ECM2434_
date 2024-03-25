
import { NavLink } from "react-router-dom";
import logoImage from '../assets/images/logo.png';
import { useCookies } from "react-cookie";
import { useUser } from "../contexts/userContext";
import { useEffect } from "react";
import ApiClient from "../api/index";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import "./Navbar.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { MenuItem } from "@mui/material";

const Navbar = ({ }) => {
    const [cookies, setCookie] = useCookies(["user"]);

    const { user, setUser, userData } = useUser();

    const [showDropdown, setShowDropdown] = useState(false);

    const [anchorElNav, setAnchorElNav] = useState(null);

    const navigate = useNavigate();

    // Loads the user from the cookies if set
    useEffect(() => {
        if (cookies.user) {
            setUser(cookies.user);
        }
        // maybe redirect to login page if no user
    }, [cookies.user]);

    // Logs the user out
    function logout() {
        setCookie("user", "", { path: "/" });
        setUser(null);
        navigate("/");
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const navLinks = [
        { to: "/", label: "Home", condition: true },
        { to: "/Leaderboard", label: "Leaderboard", condition: user },
        { to: "/Profile/me", label: "Profile", condition: user },
        { to: "/Submissions", label: "Submissions", condition: userData?.role === "GameKeeper" || userData?.role === "Developer" },
        { to: "/Login", label: "Login", condition: !user },
        { to: "/Register", label: "Register", condition: !user }
    ];

    return (
        <div className="banner">
            <div className="navContainer">
                <img src={logoImage} alt="Logo" className="navbarLogo" />
                <div className={classes.navLinks}>
                    {navLinks.map((link, index) => (
                        link.condition && <NavLink key={index} to={link.to}>{link.label}</NavLink>
                    ))}
                    {user && <button className={classes.button} onClick={logout}>Logout</button>}
                </div>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', display: 'flex', justifyContent: 'end' } }}>
                    <IconButton size="large" onClick={handleOpenNavMenu} color="black">
                        <AiOutlineMenu />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        onClose={() => setAnchorElNav(null)}
                    >
                        {navLinks.map((link, index) => (
                            link.condition &&
                            <MenuItem key={index} onClick={() => setAnchorElNav(null)} sx={{
                                textDecoration: 'none',
                                color: 'black',
                                width: '100%',
                            }}>
                                <NavLink key={index} to={link.to} className={classes.menuItem}>{link.label}</NavLink>
                            </MenuItem>
                        ))}
                        {user && <MenuItem onClick={() => { setAnchorElNav(null); logout() }}>Logout</MenuItem>}
                    </Menu>
                </Box>
            </div>
        </div>
    );
}

export default Navbar;
