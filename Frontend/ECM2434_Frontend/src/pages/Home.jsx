import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext';
import {CreateQuestForm} from '../components/forms/createQuest/createQuestForm';
import classes from './Home.module.css';

const Home = () => {
    
    //This is how you use the user context, you can access all these variables and functions from the context
    const { user,setUser,userData,userDataError,userDataLoading} = useUser();
    const [showForm, setShowForm] = useState(false);
    //ctrl i

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
                    {!showForm && <button onClick={() => setShowForm(true)}>Create Quest</button>}
                </div>
                {showForm && <CreateQuestForm />}
            </div>
    );
}

export default Home