import { NavLink } from "react-router-dom";
import logoImage from '../assets/images/logo.png';

const Navbar = () => {
    return (
        <div className="banner">
            <div className="navContainer">
                <img src={logoImage} alt="Logo" className="navbarLogo" />
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