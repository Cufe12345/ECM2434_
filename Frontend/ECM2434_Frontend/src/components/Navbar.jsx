import { NavLink } from "react-router-dom";
import logoImage from '../assets/images/logo.png';
import { useCookies } from "react-cookie";
import { useUser } from "../contexts/userContext";
import { useEffect } from "react";
import ApiClient from "../api/index";
import classes from "./Navbar.module.css";

const Navbar = ({ }) => {
    const [cookies, setCookie] = useCookies(["user"]);

    const { user, setUser} = useUser();

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
    }

    return (
        <div className="banner">
            <div className="navContainer">
                <img src={logoImage} alt="Logo" className="navbarLogo" />
                <div className="navLinks">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Leaderboard">Leaderboard</NavLink>
                    {user ? (
                        <>
                            <NavLink to="/Profile">Profile</NavLink>
                            <button className={classes.button} onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/Login">Login</NavLink>
                            <NavLink to="/Register">Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;