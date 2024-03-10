import React from "react";
import { Popup } from "../components/popup";
import { useUser } from "../contexts/userContext";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api/index";

//Created by Utzo-Main (Uzo Ibenye)
export default function EmailValidationPage() {

    //This is how you use the user context, you can access all these variables and functions from the context
    const { user, setUser, userData, userDataError, userDataLoading } = useUser();
  
    //Cookie for user
    const [cookies, setCookie] = useCookies(["user"]);
  
    //Controls the visibility of the popup
    const [showPopup, setShowPopup] = useState(false);
  
    //The text to be displayed in the popup
    const [popupText, setPopupText] = useState("");
  
    const navigate = useNavigate();
  
    //Handles the closing of the popup
    const handleClose = () => {
      setShowPopup(false);
    };

  
    
  
  
     /**
       * This function fetches the quests of the user
       */
     function checkValidation() {
      ApiClient.api.verifyEmail(user, data).then((res) => {
          console.log(res)
          fetchEmail(user);
      }).catch((error) => {
          console.log(error);
      });
  }
    return (
  
      <div className={classes.container}>
            <p>"Test"</p>
            <Popup handleClose={handleClose} open={showPopup}>
              <h5 className={classes.popupText}>{popupText}</h5>
            </Popup>
      </div>
    );
  }