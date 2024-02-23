import React, { useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import {CreateQuestForm} from '../components/forms/createQuest/createQuestForm';
import classes from './Home.module.css';
const Home = () => {
    
    //This is how you use the user context, you can access all these variables and functions from the context
    const { user,setUser,userData,userDataError,userDataLoading} = useUser();
    
    //ctrl i

    return (
        // should be !userDataLoading but for testing purposes we will keep it as true
        userDataLoading ? 
            <h1>Loading...</h1>
            : 
            <div className={classes.container}>
                <h1>Home</h1>
                <CreateQuestForm/>
            </div>
    );
}

export default Home