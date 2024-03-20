import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import { CreateQuestForm } from "../components/forms/createQuest/createQuestForm";

import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";
// import { DailyQuestPage } from "./DailyQuestPage";
import Button from "@mui/material/Button"
import AboutUs from "./aboutUs";

const Home = () => {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [showAboutUs, setAboutUs] = useState(false);

  const navigate = useNavigate();

  //This useEffect is used to check if the user is logged in, if they are then they are redirected to the daily quest page
  useEffect(() => {
    if (user) {
      console.log("User is logged in");
      navigate("/dailyQuest");
    }
  }, [user]);
  //This return is conditionally rendered based on whether the user is logged in or not

  const handleAboutUsClick = () => {
    navigate('/about_us'); };

  const handleGetStarted= () => {
    navigate('/Register'); };

  return (
    <>

      <div className={classes.container}>
        <div className={classes.leftSideContent}>
          <h1>
            Daily <span className={classes.ecoGradient}>Eco</span> Quest
          </h1>
          <div className={classes.textGroup}>
            <h5>Challenge your friends at Uni,</h5>
            <h5>Save the planet.</h5>
          </div>
          <div className={classes.buttonGroup}>
            <button
              className={classes.GetStartedButton}
              onClick={handleGetStarted}
            >
              Get Started 
            </button>
            <button
              className={classes.AboutUsButton}
              onClick={handleAboutUsClick}
            >
              About Us
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
