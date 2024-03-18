import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import bronze from '../assets/images/BronzeBorder.png';
import silver from '../assets/images/SilverBorder.png';
import gold from '../assets/images/GoldBorder.png';
import diamond from '../assets/images/DiamondBorder.png';
import rust from '../assets/images/RustBorder.png';
import classes from "./playerIcon.module.css";
import { useState } from "react";

export function PlayerIcon({ style,userData }) {
    const [border, setBorder] = useState(null);

    useEffect(() => {
        setBorder(getBorder());
    }, []);
    
    function getBorder() {
        console.log(style);
        if (style === "rust") {
            return rust;
        } else if (style === "bronze") {
            console.log("HERE");
            return bronze;
        } else if (style === "silver") {
            return silver;
        } else if (style === "gold") {
            return gold;
        } else {
            return diamond;
        }
    }

    return (
        <div className={classes.container}>
            <img className={classes.border} src={border} alt="Bronze Border" />
            <Avatar alt="User Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 50, height: 50 }} className={classes.icon} >{userData?.firstName != undefined ? (userData?.firstName[0]) : 'N/'}{userData?.lastName != undefined ? (userData?.lastName[0]) : 'A'}</Avatar>
        </div>
    );
}