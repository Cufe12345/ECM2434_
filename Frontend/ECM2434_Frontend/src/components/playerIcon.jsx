import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import _1 from "../assets/images/1.png";
import _2 from "../assets/images/2.png";
import _3 from "../assets/images/3.png";
import _4 from "../assets/images/4.png";
import _5 from "../assets/images/5.png";

import classes from "./playerIcon.module.css";
import { useState } from "react";
import { useNetwork } from "../contexts/networkContext";

// Author: Callum Young(Cufe12345)
export function PlayerIcon({ userData,width,height }) {

    const { ip } = useNetwork();

    //Stores the border image to be displayed
    const [border, setBorder] = useState(null);

    //Stores if the user has no border
    const [none, setNone] = useState(false);

    //Sets the border image to be displayed once the component is loaded
    useEffect(() => {
        setBorder(getBorder());
    }, []);

    useEffect(() => {
        setBorder(getBorder());
    }, [userData]);
    
    /**
     * Used to set the border image to be displayed based on the user data
     * @returns The border image to be displayed
     */
    function getBorder() {
        if(userData?.border === undefined){
            setNone(true);
        }
        if(userData?.border === "none"){
            setNone(true);
        }
        if (userData?.border === "1") {
            setNone(false);
            return _1;
        } else if (userData?.border === "2") {
            setNone(false);
            return _2;
        } else if (userData?.border === "3") {
            setNone(false);
            return _3;
        } else if (userData?.border === "4") {
            setNone(false);
            return _4;
        } else if (userData?.border === "5") {
            setNone(false);
            return _5;
        }
        else{
            setNone(true);
        }
    }

    return (
        <div className={classes.container}>
            {!none ?(
            <img className={classes.border} src={border} style={{width: width*1.3, height:height*1.3 ,top: -(height*0.13)}} alt="Bronze Border" />
            ):(
                <></>
            )}
            <Avatar alt="User Profile Picture" src={ip+userData?.imgURL} sx={{ width: width, height: height }} className={classes.icon} >{userData?.first_name != undefined ? (userData?.first_name[0]) : 'N/'}{userData?.last_name != undefined ? (userData?.last_name[0]) : 'A'}</Avatar>
        </div>
    );
}