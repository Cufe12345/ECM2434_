import React, { useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import {CreateQuestForm} from '../components/forms/createQuest/createQuestForm';
const Home = () => {
    
    //This is how you use the user context, you can access all these variables and functions from the context
    const { user,setUser,userData,userDataError,userDataLoading} = useUser();
    
    

    return (
        // should be !userDataLoading but for testing purposes we will keep it as true
        userDataLoading ? 
            <h1>Loading...</h1>
            : 
            <div>
                <h1>Home</h1>
                {/* <CreateQuestForm/> */}
            </div>
    );
}

export default Home;