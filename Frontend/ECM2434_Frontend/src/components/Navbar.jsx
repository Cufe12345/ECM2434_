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

const Navbar = ({ }) => {
    const [cookies, setCookie] = useCookies(["user"]);

    const { user, setUser, userData } = useUser();

    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    //Loads the user from the cookies if set
    useEffect(() => {
        if (cookies.user) {
            setUser(cookies.user);
        }
        //maybe redirect to login page if no user
    }, [cookies.user]);

    //Logs the user out
    function logout() {
        setCookie("user", "", { path: "/" });
        setUser(null);
        navigate("/");
    }

    return (
        <div className="banner">
            <div className="navContainer">
                {!showDropdown && (
                    <img src={logoImage} alt="Logo" className="navbarLogo" />
                )}
                <div className={classes.navLinks}>
                    <NavLink to="/">Home</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/Leaderboard">Leaderboard</NavLink>
                            <NavLink to="/Profile/me">Profile</NavLink>
                            {(userData?.role === "GameKeeper" || userData?.role === "Developer") && (<NavLink to="/Submissions">Submissions</NavLink>)}
                            <button className={classes.button} onClick={logout}>Logout</button>

                        </>

                    ) : (
                        <>
                            <NavLink to="/Login">Login</NavLink>
                            <NavLink to="/Register">Register</NavLink>
                        </>
                    )}
                </div>
                <div className={classes.mobile}>
                    <div className="dropdown">
                        <button className={classes.dropbtn} onClick={() => setShowDropdown(!showDropdown)}>{!showDropdown ? (<p>Show Menu</p>) : (<p>Hide Menu</p>)}</button>
                        {showDropdown && (
                            <div className={classes.dropdown}>
                                <NavLink to="/">Home</NavLink>
                                {user ? (
                                    <>
                                        <NavLink to="/Leaderboard">Leaderboard</NavLink>
                                        <NavLink to="/Profile/me">Profile</NavLink>
                                        {(userData?.role === "GameKeeper" || userData?.role === "Developer") && (<NavLink to="/Submissions">Submissions</NavLink>)}
                                        <button className={classes.button} onClick={logout}>Logout</button>
                                    </>

                                ) : (
                                    <>
                                        <NavLink to="/Login">Login</NavLink>
                                        <NavLink to="/Register">Register</NavLink>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;