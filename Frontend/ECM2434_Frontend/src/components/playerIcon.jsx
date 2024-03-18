import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import bronze from '../assets/images/BronzeBorder.png';
import silver from '../assets/images/SilverBorder.png';
import gold from '../assets/images/GoldBorder.png';
import diamond from '../assets/images/DiamondBorder.png';
import rust from '../assets/images/RustBorder.png';
import classes from "./playerIcon.module.css";
import { useState } from "react";

export function PlayerIcon({ userData }) {
    const [border, setBorder] = useState(null);
    const [none, setNone] = useState(false);
    useEffect(() => {
        setBorder(getBorder());
    }, []);
    
    function getBorder() {
        
        if(userData?.border === undefined){
            return bronze;
        }
        if(userData?.border === "none"){
            setNone(true);
        }
        if (userData?.border === "rust") {
            return rust;
        } else if (userData?.border === "bronze") {
            console.log("HERE");
            return bronze;
        } else if (userData?.border === "silver") {
            return silver;
        } else if (userData?.border === "gold") {
            return gold;
        } else {
            return diamond;
        }
    }

    return (
        <div className={classes.container}>
            {!none ?(
            <img className={classes.border} src={border} alt="Bronze Border" />
            ):(
                <></>
            )}
            <Avatar alt="User Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 50, height: 50 }} className={classes.icon} >{userData?.firstName != undefined ? (userData?.firstName[0]) : 'N/'}{userData?.lastName != undefined ? (userData?.lastName[0]) : 'A'}</Avatar>
        </div>
    );
}