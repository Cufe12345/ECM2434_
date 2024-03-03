import React from "react";
import { useUser } from "../contexts/userContext";
import { useState, useEffect } from "react";
import { CreateQuestForm } from "../components/forms/createQuest/createQuestForm";
import { DailyQuest } from "../components/dailyQuest";
import { SubmitQuestForm } from "../components/forms/submitQuest/submitQuestForm";
import classes from "./DailyQuestPage.module.css";
import { useCookies } from "react-cookie";
import { Popup } from "../components/popup";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api/index";

//Created by Cufe12345(Callum Young)
export default function DailyQuestPage() {

  //This is how you use the user context, you can access all these variables and functions from the context
  const { user, setUser, userData, userDataError, userDataLoading } = useUser();

  //Controls the visibility of the create quest form
  const [showForm, setShowForm] = useState(false);

  //Controls the visibility of the daily quest component
  const [showDailyQuest, setShowDailyQuest] = useState(false);

  //Cookie for user
  const [cookies, setCookie] = useCookies(["user"]);

  //Controls the visibility of the submit quest form
  const [showSubmitQuest, setShowSubmitQuest] = useState(false);

  //Controls the visibility of the popup
  const [showPopup, setShowPopup] = useState(false);

  //Handles the visibility of the create quest form
  const [showCreateQuest, setShowCreateQuest] = useState(false);

  //The text to be displayed in the popup
  const [popupText, setPopupText] = useState("");

  //The quest to be displayed
  const [quest, setQuest] = useState(null);

  const navigate = useNavigate();

  //Handles the closing of the popup
  const handleClose = () => {
    setShowPopup(false);
  };

  //Handles the opening of the submit quest form when the daily quest component button is clicked
  const handleCompleteQuest = () => {
    setShowSubmitQuest(true);
  };

  //Handles the closing of the submit quest form
  const handleCloseSubmitQuest = () => {
    setShowSubmitQuest(false);
  };

  //Handles the opening of the create quest form 
  const handleCreateQuest = () => {
    setShowCreateQuest(true);
  };

  //Handles the closing of the create quest form
  const handleCloseCreateQuest = () => {
    setShowCreateQuest(false);
  };


  //Loads the user from the cookies if set
  useEffect(() => {
    if (cookies.user) {
      setUser(cookies.user);
    }
    //maybe redirect to login page if no user
  }, [cookies.user]);

  //This useEffect is used to check if the user is logged in, if they arent then brings them back to home page
  useEffect(() => {
    if(user == null){
      navigate("/");
    }
  }, [user]);


   /**
     * This function fetches the quests of the user
     */
   function fetchQuests() {
    ApiClient.api.fetchQuests(user).then((res) => {
        console.log(res)
        for (let i = res.length-1; i > 0; i--) {
            //should be equal to true but for testing purposes we will keep it as false
            if (res[i].state === true) {
                setQuest(res[i]);
                break;
            }
        }
    }).catch((error) => {
        console.log(error);
    });
}
  return (

    <div className={classes.container}>
          {showSubmitQuest ? (
            <SubmitQuestForm
              onBackClick={handleCloseSubmitQuest}
              setOpen={setShowPopup}
              setPopupText={setPopupText}
              quest={quest}
            />
          ) : (
            showCreateQuest ?( <CreateQuestForm handleClose={handleCloseCreateQuest} setPopupMessage={setPopupText} setShowPopup={setShowPopup}/>):
           ( <DailyQuest onDailyQuestComplete={handleCompleteQuest} onCreateQuestClick={handleCreateQuest} quest={quest}fetchQuests={fetchQuests}/>)
          
          )}
          <Popup handleClose={handleClose} open={showPopup}>
            <h5 className={classes.popupText}>{popupText}</h5>
          </Popup>
    </div>
  );
}
