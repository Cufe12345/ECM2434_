import React, { useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import {CreateQuestForm} from '../components/forms/createQuest/createQuestForm';
import {DailyQuest} from '../components/dailyQuest';
import classes from './Home.module.css';
import { useCookies } from 'react-cookie';

const Home = () => {
    
    //This is how you use the user context, you can access all these variables and functions from the context
    const { user,setUser,userData,userDataError,userDataLoading} = useUser();
    //ctrl i

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
                <h1>Home</h1>
                <p>Just putting these components below here so i can see them login first before using form</p>
                <p>If you create a quest in form the Daily quest will update with the newly created quest when you reload</p>
                <DailyQuest/>
                <CreateQuestForm/>

            </div>
    );
}

export default Home