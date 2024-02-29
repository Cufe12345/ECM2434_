import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="banner">
            <div className="navContainer">
                <h1>Logo</h1>
                <div className="navLinks">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Login">Login</NavLink>
                    <NavLink to="/Register">Register</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;