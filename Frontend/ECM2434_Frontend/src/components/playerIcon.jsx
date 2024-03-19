import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import _1 from "../assets/images/1.png";
import _2 from "../assets/images/2.png";
import _3 from "../assets/images/3.png";
import _4 from "../assets/images/4.png";
import _5 from "../assets/images/5.png";

import classes from "./playerIcon.module.css";
import { useState } from "react";

// Author: Callum Young(Cufe12345)
export function PlayerIcon({ userData }) {

    //Stores the border image to be displayed
    const [border, setBorder] = useState(null);

    //Stores if the user has no border
    const [none, setNone] = useState(false);

    //Sets the border image to be displayed once the component is loaded
    useEffect(() => {
        setBorder(getBorder());
    }, []);
    
    /**
     * Used to set the border image to be displayed based on the user data
     * @returns The border image to be displayed
     */
    function getBorder() {
        
        if(userData?.border === undefined){
            // setNone(true);
            return _5;
        }
        if(userData?.border === "none"){
            setNone(true);
        }
        if (userData?.border === "1") {
            return _1;
        } else if (userData?.border === "2") {
            console.log("HERE");
            return _2;
        } else if (userData?.border === "3") {
            return _3;
        } else if (userData?.border === "4") {
            return _4;
        } else {
            return _5;
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