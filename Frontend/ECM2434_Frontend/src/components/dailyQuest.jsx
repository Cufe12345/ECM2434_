import React from 'react';
import { useUser } from '../contexts/userContext';
import ApiClient from '../api/index';
import { useState, useEffect, useRef, useCallback } from 'react';
import classes from './dailyQuest.module.css';
import image from "../assets/images/600px-Example_image.png";
import { Map } from './map';

//Created by Cufe12345(Callum Young)

export function DailyQuest({ onDailyQuestComplete, onCreateQuestClick, quest, fetchQuests }) {
    const { user, setUser, userDataLoading, userData } = useUser();

    //Stores todays quest
    // const[quest,setQuest] = useState(null);

    //Stores the location of the quest
    const [location, setLocation] = useState(null);

    const [height, setHeight] = useState(100);
    const [currentTime, setCurrentTime] = useState(calculateTimeLeft());

    //Reference to the map container element
    const mapRef = useRef();

    function calculateTimeLeft() {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const timeLeft = midnight - now;

        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60);

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };


    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(calculateTimeLeft());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);


    /*Fetches the quests once the users data is finished loading*/
    useEffect(() => {
        if (userDataLoading) return;
        fetchQuests();
    }, [userDataLoading]);

    /*Fetches the location of the quest when the quest is set*/
    useEffect(() => {
        if (quest) {
            console.log(quest)
            fetchLocations(quest.locationID);
        }
    }, [quest]);
    useEffect(() => {
        console.log("DATA: ", userData);
    }, [userDataLoading])



    /*Is called when the image is resized  and resizes the map's height so it matches*/
    const imageRef = useCallback(node => {
        if (!node) return;
        const resizeObserver = new ResizeObserver(() => {
            console.log("resize")
            const element = mapRef.current;
            // if(node.clientHeight === undefined || node === undefined) return;
            element.style.minHeight = `${node?.clientHeight}px`;
            element.style.maxHeight = `${node?.clientHeight}px`;
            setHeight(node?.clientHeight);
        });
        resizeObserver.observe(node);
    }, []);

    // useEffect(() => {
    //     const element = mapRef.current;
    //     console.log(element)
    //     console.log(imageRef?.current?.clientHeight)
    //     if(element){
    //         console.log(element)
    //         element.style.minHeight = `${imageRef?.current.clientHeight}px`;
    //         element.style.maxHeight = `${imageRef?.current.clientHeight}px`;
    //     }
    // }, [imageRef?.current?.clientHeight]);


    /**
     * This function fetches the location of the quest
     * @param {*} id - the id of the location
     */
    function fetchLocations(id) {
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

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                {/* Need to have backend rules that only allow gamekeeper to create a quest */}
                {(userData?.role === "GameKeeper" || userData?.role === "Developer") && (
                    <div className={classes.createContainer}>
                        <button className={classes.createButton} onClick={onCreateQuestClick}>Create a Quest</button>
                    </div>
                )}
                <div className={classes.titleContainer}>
                    <h1>Today's Quest</h1>
                </div>
                {(quest === undefined || quest === null) ? (
                    <div className={classes.titleContainer}>
                        <p className={classes.questName}>No Quests Available, ask the GameKeeper to create one</p>
                    </div>
                ) : (
                    <>
                        <div className={classes.questContainer}>
                            {/* <div className={classes.titleContainer}>
                                <p className={classes.questName}>Title: {quest?.name}</p>
                            </div> */}
                            <p className={classes.questDesc}>"{quest?.task}"</p>
                            <p className={classes.questName}>Reward: {quest?.reward}xp</p>
                            <p className={classes.countdownText}>{currentTime}</p>
                        </div>

                        <div className={classes.imgContainer}>
                            <div className={classes.leftContainer}>
                                <div className={classes.imgContainer2}>
                                    <p className={classes.questName}>Location: {location?.name}</p>
                                    {/*this will be a map in the future*/}
                                    {/* <img className={classes.img} src={image} alt="Example Image" /> */}
                                    <div className={classes.mapContainer} ref={mapRef} id={classes.map}>
                                        {location?.longitude && location?.latitude ? <Map center={[location?.latitude, location?.longitude]} zoom={20} scrollWheelZoom={false} height={height} /> : null}
                                        {/* <Map center={[location?.longitude, location?.latitude]} zoom={10} scrollWheelZoom={false} /> */}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.rightContainer}>
                                <div className={classes.imgContainer2}>
                                    <p className={classes.questName}>Example Image</p>
                                    {/* <img className={classes.img} ref={imageRef} src={"http://localhost:8000" + quest?.imgURL} alt="Example Image" /> */}
                                </div>
                            </div>
                        </div>
                        <button className={classes.button} onClick={onDailyQuestComplete}>Complete Quest</button>
                    </>
                )}

            </div>
        </div>
    )
}