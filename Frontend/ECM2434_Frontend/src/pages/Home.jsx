import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext';
import {CreateQuestForm} from '../components/forms/createQuest/createQuestForm';
import {DailyQuest} from '../components/dailyQuest';
import classes from './Home.module.css';
import { useCookies } from 'react-cookie';

const Home = () => {
    
    //This is how you use the user context, you can access all these variables and functions from the context
    const { user,setUser,userData,userDataError,userDataLoading} = useUser();
    //ctrl i
    const [showForm, setShowForm] = useState(false);
    const [showDailyQuest, setShowDailyQuest] = useState(false);
    const [cookies, setCookie] = useCookies(['user'])

    //Loads the user from the cookies if set
    useEffect(() => {
        if(cookies.user){
            setUser(cookies.user);
        }
        //maybe redirect to login page if no user
    }, [cookies.user]);
    return (
        // should be !userDataLoading but for testing purposes we will keep it as true
        userDataLoading ? 
            <h1>Loading...</h1>
            : 
            <div className={classes.container}>
                <div className={classes.leftSideContent}>
                    <h1>Daily <span className={classes.ecoGradient}>Eco</span> Quest</h1>
                    <div className={classes.textGroup}>
                        <h5>Challenge your friends at Uni,</h5>
                        <h5>Save the planet.</h5>
                    </div>
                    <div className={classes.buttonGroup}>
                        <button className={classes.createQuestButton} onClick={() => setShowForm(!showForm)}>Create Quest</button>
                        <button className={classes.dailyQuestButton} onClick={() => setShowDailyQuest(!showDailyQuest)}>Daily Quest</button>
                    </div>
                </div>
                {showForm && <CreateQuestForm />}
                {showDailyQuest && <DailyQuest />}
            </div>
    );
}

export default Home