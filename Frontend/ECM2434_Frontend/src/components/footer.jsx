import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./footer.module.css";
export function Footer() {
    return (
        <div className={classes.footerContainer}>
            <footer className={classes.footer}>

                <p>© 2023EcoQuest</p>
                <NavLink to="/code_conduct">Code of Conduct</NavLink>
                <NavLink to="/security">Security</NavLink>

            </footer>
        </div>
    );
}