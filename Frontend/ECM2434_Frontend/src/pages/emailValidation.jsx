import React from "react";
import { Popup } from "../components/popup";
import { useUser } from "../contexts/userContext";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api/index";
import classes from "./emailValidation.module.css"
import { useParams } from "react-router-dom"; 

//Author: @Utzo-Main
export default function EmailValidationPage() {

    // calls useParams() method to define a username and token from the URL
    let {username} = useParams();
    let {token} = useParams();
  
    //Controls the visibility of the popup
    const [showPopup, setShowPopup] = useState(false);
  
    //The text to be displayed in the popup
    const [popupText, setPopupText] = useState("Email has been Successful");
  
    const navigate = useNavigate();

    // Calls checkValidation() method
    useEffect(() => {
      checkValidation()
    }, [])
  
    //Handles the closing of the popup
    const handleClose = () => {
      setShowPopup(false);
    };

     /**
       * This function checks whether the user has verified their email
       */
     function checkValidation() {
      let data = {
        username: username, 
        token: token,
      }
      console.log(username);
      console.log(token);
      console.log(data)
      // Calls verifyEmail() method from testRequest.jsx
      ApiClient.api.verifyEmail(data).then((res) => {
          console.log(res)
          setShowPopup(true);

        }).catch((error) => {
          console.log(error);
      });
  }
    return (
      // Open to some rework for asthetics
      <div className={classes.container}>
        <h1>
            Email <span className={classes.ecoGradient}>Sucessfully</span> Verified
        </h1>
          <div className={classes.textGroup}>
            <h5>Welcome to EcoQuest</h5>
          </div>
            <p>{username}</p>
            {/*<p>{token}</p>*/}
            <Popup handleClose={handleClose} open={showPopup}>
              <h5 className={classes.popupText}>{popupText}</h5>
            </Popup>
      </div>
    );
  }