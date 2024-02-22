import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="banner">
            <div className="navContainer">
                <h1>Logo</h1>
                <div className="navLinks">
                    <NavLink>Home</NavLink>
                    <NavLink>Login</NavLink>
                    <NavLink>Register</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;