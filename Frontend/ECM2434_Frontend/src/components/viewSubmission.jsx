import React, { useState,useEffect } from "react";
import classes from "./viewSubmission.module.css";
import { useUser } from "../contexts/userContext";
import ApiClient from "../api/index";
export function ViewSubmission() {
    const [submissions, setSubmissions] = useState([]);
    const [fetchingSubmissions, setFetchingSubmissions] = useState(false);
    const [submission, setSubmission] = useState(null);
    const { user, userData, userDataLoading } = useUser();
    const [dailyQuest, setDailyQuest] = useState(null);

    useEffect(() => {
        if (!userDataLoading) {
            fetchDailyQuest();
        }
    }, [userDataLoading]);

    useEffect(() => {
        if(dailyQuest){
            setFetchingSubmissions(true);
            fetchSubmissions();
        }
    }, [dailyQuest]);
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
                if(res[i].questID === dailyQuest.questID){
                    validSubmissions.push(res[i]);
                }
            }
            console.log("VALID: ",validSubmissions);
            setSubmission(0);
            setSubmissions(validSubmissions);
            setFetchingSubmissions(false);
        });
        //fetch submissions from backend
        //setSubmissions to the submissions
        // setFetchingSubmissions(false);
    }
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



    const onSubmissionChange = (e) => {
        console.log("CALLED: ",e.target.value);
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
                    <button className={classes.Button} style={{backgroundColor:"green"}}>Approve</button>
                </div>
            </>
        )}

    </div>
  );
}