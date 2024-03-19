import React, { useEffect,useState } from "react";
import classes from "./feedCards.module.css";
import { useUser } from "../contexts/userContext";
import ApiClient from "../api/index";
import Avatar from '@mui/material/Avatar';
import Chip  from "@mui/material/Chip";
import { CiStar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { PlayerIcon } from "./playerIcon";
export function FeedCards() {

    //Stores all the valid submissions for the daily quest
    const [submissions, setSubmissions] = useState([]);

    //Stores the feed objects to be displayed
    const [feed, setFeed] = useState([{}]);

    //Stores the user data and token
    const { user, userData, userDataLoading } = useUser();

    //Stores all the users
    const [allUsers, setAllUsers] = useState([]);

    //Stores the daily quest
    const [dailyQuest, setDailyQuest] = useState(null);

    const navigate = useNavigate();

    //Fetches the daily quest once the user data is loaded
    useEffect(() => {
        if (!userDataLoading) {
            fetchDailyQuest();
        }
    }, [userDataLoading]);

    //Fetches the submissions once the daily quest is set
    useEffect(() => {
        if (dailyQuest) {
            fetchFeedSubmissions();
        }
    }, [dailyQuest]);
    
    //Creates the feed objects once the submissions and users are set
    useEffect(() => {

        if (submissions?.length > 0 && allUsers?.length > 0) {
            createFeedObjects();
        }
    }, [submissions, allUsers]);

    //Fetches the users once the submissions are set
    useEffect(() => {
        if(submissions?.length >0){
            checkUser();
            fetchUsers();
        }
    }, [submissions]);


    /**
     * Fetches the daily quest from the backend and sets it
     */
    async function fetchDailyQuest() {
        console.log("Fetching daily quest");
        ApiClient.api.fetchQuests(user).then((res) => {
            console.log(res);
            if (res.length == 0 || res == null) {
                return;
            }
            for (let i = res.length - 1; i > 0; i--) {
                if (res[i].state === true) {

                    setDailyQuest(res[i]);
                    break;
                }
            }

            // setFetchingQuests(false);
        });
    }

    /**
     * Fetches the valid submissions for the daily quest from the backend
     */
    function fetchFeedSubmissions() {
        //fetch request to get the feed
        let data = {
            questID: dailyQuest.questID,
        }
        ApiClient.api.fetchFeed(user,data)
            .then((response) => {
                // console.log(response.data);
                console.log(response);
                if(response.message){
                    navigate("/");
                }
                setSubmissions(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Checks if the user has submitted a quest for today and if not redirects them to the home page
     */
    function checkUser(){
        let valid = false;
        for(let i = 0; i < submissions.length; i++){
            if(submissions[i].user === userData.id){
                valid = true;
            }
        }
        if(!valid){
            console.log("User has not submitted a quest for today");
            navigate("/");
        }
    }

    //Currently fetches all the users probs better to be able to pass in a id and it returns that specific user but you can currently only do that with username not uid
    /**
     * Fetches all the users from the backend
     */
    function fetchUsers(){
        ApiClient.api.fetchAllUsers(user)
        .then((response) => {
            // console.log(response.data);
            console.log(response);
            setAllUsers(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Creates the feed objects from the submissions and users by making objects with the fields we need from both
     */
    function createFeedObjects(){
        let feed = [];
        for(let i = 0; i < submissions.length; i++){
            let submission = submissions[i];
            let user = allUsers.find((user) => user.id === submission.user);

            //Colour of the chip ie the role of the user
            let colour = "primary";
            if(user.role === "GameKeeper"){
                colour = "success";
            }
            else if(user.role === "Developer"){
                colour = "error";
            }
            let feedObject = {
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                rank: user.rank,
                role:user.role,
                img:submission.imgURL,
                info:submission.info,
                colour:colour,
                date:new Date(submission.date_created),
                border: user.border,
            }
            feed.push(feedObject);
        }
        setFeed(feed);
        console.log(feed);
    
    }

    function handleProfileClick(username){
        navigate("/profile/"+username);
    }
    return (
        <div className={classes.container}>
            {feed.map((feedObject,index) => {
                // console.log(feedObject.date.getHours());
                return(
                <div className={classes.card} key={index}>
                    <div className={classes.topContainer}>
                        <div className={classes.userContainer}>
                            <div className={classes.avatarContainer} onClick={()=>handleProfileClick(feedObject.username)}>
                                <PlayerIcon userData={feedObject}/>
                            </div>
                            <div className={classes.nameRoleContainer}>
                                <h2>{feedObject.username}</h2>
                                <div className={classes.chipContaier}>
                                    <Chip label={feedObject.role} color={feedObject.colour} style={{ fontSize:10}}size="small"/>     
                                </div>
                            </div>
                            <div className={classes.rankIcon}>
                                    <CiStar style={{ color: '#A00120' }} size={30}/>
                                        <p>Level {feedObject.rank}</p>
                                </div>
                            
                        </div>
                        {/* {console.log(feedObject)} */}
                        {feedObject.date !== undefined &&(
                    
                        <p className={classes.date}>{feedObject.date?.getHours()}:{feedObject.date?.getMinutes()}</p>
                        )}
                    </div>
                    <hr className={classes.line}/>
                    <div className={classes.imgContainer}>
                        <img src={"http://localhost:8000" + feedObject.img} alt="Quest" className={classes.imgPreview} />
                    </div>
                    <hr className={classes.line}/>
                    <div className={classes.infoContainer}>
                        <p>{feedObject.info}</p>
                    </div>
                </div>
                )
            })}
        </div>
    );
    }