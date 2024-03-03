import React, { useState,useEffect } from "react";
import classes from "./viewSubmission.module.css";
import { useUser } from "../contexts/userContext";
import ApiClient from "../api/index";
export function ViewSubmission() {

    //Stores all the valid submissions
    const [submissions, setSubmissions] = useState([]);

    //Stores if the submissions are being fetched
    const [fetchingSubmissions, setFetchingSubmissions] = useState(false);

    //Stores the current selected submission
    const [submission, setSubmission] = useState(null);

    //Stores the user data and token
    const { user, userData, userDataLoading } = useUser();

    //Stores the daily quest
    const [dailyQuest, setDailyQuest] = useState(null);

    //Fetches the daily quest once the user data is loaded
    useEffect(() => {
        if (!userDataLoading) {
            fetchDailyQuest();
        }
    }, [userDataLoading]);

    //Fetches the submissions once the daily quest is set
    useEffect(() => {
        if(dailyQuest){
            setFetchingSubmissions(true);
            fetchSubmissions();
        }
    }, [dailyQuest]);

    /**
     * Fetches the submissions from the backend and sets the valid submissions
     * @returns 
     */
    async function fetchSubmissions() {
        console.log("Fetching Submissions");
        
        if(dailyQuest == null){
            setFetchingSubmissions(false);
            //maybe display a message saying no daily quest ie popup or something
            console.log("No daily quest");
            return;
        }
        console.log(dailyQuest);
        ApiClient.api.fetchSubmissions(user).then((res) => {
            console.log(res);
            if(res.length == 0){
                return;
            }
            let validSubmissions = [];
            for(let i = 0; i < res.length; i++){
                if(res[i].questID === dailyQuest.questID && res[i].verified === false){
                    validSubmissions.push(res[i]);
                }
            }
            console.log("VALID: ",validSubmissions);
            setSubmission(0);
            setSubmissions(validSubmissions);
            setFetchingSubmissions(false);
        });
       
    }

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
            for (let i = res.length-1; i > 0; i--) {
                if (res[i].state === true) {
                    
                    setDailyQuest(res[i]);
                    break;
                }
            }

            // setFetchingQuests(false);
        });
    }

    /**
     * Approves the submission in the backend
     * @param {*} e - the event 
     */
    async function approveSubmission(e) {
        e.preventDefault();
        console.log("Approving submission");
        let data = {
            id: submissions[submission].questsubID,
        }
        console.log(data);
        ApiClient.api.verifySubmission(user,data).then((res) => {
            console.log(res);
            fetchSubmissions();
        });
    }



    /**
     * When the submission is changed in the select field
     * @param {*} e 
     */
    const onSubmissionChange = (e) => {
        //console.log("CALLED: ",e.target.value);
        setSubmission(e.target.value);
    }
  return (
    <div className={classes.card}>

        <h1>Submissions</h1>
        <p>Choose a submission to view</p>
        <div className={classes.submissionSelecterContainer}>
            <select value={submission} className={classes.selectField} name="type" id="type" onChange={onSubmissionChange}>
                                
                {submissions.length === 0 && !fetchingSubmissions && (<option value="null">No Submissions</option>)}
                {fetchingSubmissions && (<option value="null">Fetching Submissions...</option>)}
                {submissions?.map((sub,index) => {
                    return <option value={index}>Submission: {index+1}</option>
                })}
                                
            </select>
        </div>
        {submissions[submission] !== null && (

            <>
                <div className={classes.imgContainer}>

                    <img src={"http://localhost:8000"+submissions[submission]?.imgURL} alt="Quest" className={classes.imgPreview}/>
                </div> 
                <div className={classes.btnContainer}>
                    <button className={classes.Button} style={{backgroundColor:"red"}}>Reject</button>
                    <button className={classes.Button} onClick={approveSubmission} style={{backgroundColor:"green"}}>Approve</button>
                </div>
            </>
        )}

    </div>
  );
}