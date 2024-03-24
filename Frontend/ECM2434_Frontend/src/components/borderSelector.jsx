import React, { useEffect } from "react";
import { PlayerIcon } from "./playerIcon";
import classes from "./borderSelector.module.css";
import { useState } from "react";
export function BorderSelector({userData,borders,setBorders,selectedBorder,setSelectedBorder}){
    const [localUserData, setLocalUserData] = useState(userData);

    useEffect(() => {
        setBorders(getBorders());
    }, []);

    useEffect(() => {
        setSelectedBorder(initialPosition())
    }, [borders]);

    useEffect(() => {
        console.log(localUserData)
    }, [localUserData]);

    useEffect(() => {
        setLocalUserData({...localUserData,imgURL:userData.imgURL});
    }, [userData]);

    function initialPosition(){
        console.log(borders);
        console.log(localUserData?.border);
        for(let i = 0; i < borders.length; i++){
            if(borders[i] === localUserData?.border){
                return i;
            }
        }
        return 0;
    }
    function getBorders(){
        let rank = 0;
        if(localUserData.XP){
            if(localUserData.XP < 100){
                rank = 0;
            }
            else{
                rank = Math.floor(localUserData.XP/100);
            }
        }
        switch(rank)
        {
            case 0:
                return ["none"];
            case 1:
                return ["none"];
            case 2:
                return ["none","1"];
            case 3:
                return ["none","1","2"];
            case 4:
                return ["none","1","2","3"];
            case 5:
                return ["none","1","2","3","4"];
            case 6:
                return ["none","1","2","3","4","5"];
            default:
                return ["none","1","2","3","4","5"];
        }
    }
    const handleNext = () => {
        if(selectedBorder < borders.length-1){
            setSelectedBorder(selectedBorder+1);
            setLocalUserData({...localUserData, border:borders[selectedBorder+1]});
        }
    }
    const handleBack = () => {
        if(selectedBorder > 0){
            setSelectedBorder(selectedBorder-1);
            setLocalUserData({...localUserData, border:borders[selectedBorder-1]});
        }
    }
    return(
        <div className={classes.Container}>

            <button className={classes.btn} type="button" onClick={handleBack}disabled={selectedBorder === 0 ? true:false} >Back</button>
            <PlayerIcon userData={localUserData} width={100} height={100}/>
            <button className={classes.btn} type="button" onClick={handleNext} disabled={selectedBorder === borders.length-1 ? true:false}>Next</button>
        </div>
    )
}