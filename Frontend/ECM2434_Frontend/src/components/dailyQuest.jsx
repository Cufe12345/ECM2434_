import React from 'react';
import { useUser } from '../contexts/userContext';
import ApiClient from '../api/index';
import { useState, useEffect } from 'react';
import classes from './dailyQuest.module.css';
import image from"../assets/images/600px-Example_image.png";
export function DailyQuest({onDailyQuestComplete}) {
    const { user, setUser,userDataLoading } = useUser();

    //Stores todays quest
    const[quest,setQuest] = useState(null);

    //Stores the location of the quest
    const[location,setLocation] = useState(null);

    
    useEffect(() => {
        fetchQuests();
    }, []);

    useEffect(() => {
        if(quest){
            fetchLocations(quest.locationID);
        }
    }, [quest]);

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

    /**
     * This function fetches the location of the quest
     * @param {*} id - the id of the location
     */
    function fetchLocations(id){
        ApiClient.api.fetchLocations(user).then((res) => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                if (res[i].locationID === id) {
                    setLocation(res[i]);
                    break;
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    
    }

    return(
        <div className={classes.card}>
            <div className={classes.titleContainer}>
                <h1>Daily Quest</h1>
            </div>
            <div className={classes.titleContainer}>
                <p className={classes.questName}>Quest: {quest?.name}</p>
            </div>
            <p className={classes.questName}>Objective: {quest?.task}</p>
            <p className={classes.questName}>Reward: {quest?.reward}pts</p>

            <div className={classes.imgContainer}>
                <div className={classes.imgContainer2}>
                    <p className={classes.questName}>Location: {location?.name}</p>
                    {/*this will be a map in the future*/}
                    <img className={classes.img} src={image} alt="Example Image" />
                </div>
                <div className={classes.imgContainer2}>
                    <p className={classes.questName}>Example Image</p>
                    <img className={classes.img} src={image} alt="Example Image" />
                </div>
            </div>
            <button className={classes.button} onClick={onDailyQuestComplete}>Complete Quest</button>

        </div>
    )
}