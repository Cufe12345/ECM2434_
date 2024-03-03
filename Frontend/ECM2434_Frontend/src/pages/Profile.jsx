// Author: Jeremy Shorter

import "./profile.css"
import Avatar from '@mui/material/Avatar';
import { IoFlameSharp } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import ApiClient from "../api/index";
import { useState } from "react";
import { useUser } from "../contexts/userContext";
import { useEffect } from "react";
import { LinearProgress, linearProgressClasses } from "@mui/material";


const Profile = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState({});
    const [userDataLoading, setUserDataLoading] = useState(true);

    const username = "test0";
    console.log(userData)

    useEffect(() => {
        setUserDataLoading(true); // Set loading to true when the component mounts
        ApiClient.api.fetchUsernameData({ "username": username }, user)
            .then((res) => {
                console.log(res);
                setUserData(res);
                setUserDataLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setUserDataLoading(false);
            });
    }, [user]);

    return (
        <div className="container">
            <div className="profile">
                <div className="header">
                    <Avatar alt="User Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 150, height: 150 }} />
                    <h1>{userData.first_name + ' ' + userData.last_name}</h1>
                    <h2> {userData.username} </h2>
                </div>
                <div className="icons">
                    <div className="stats">
                        <div className="icon">
                            <IoFlameSharp style={{ color: '#A00120' }} />
                            <p>Streak</p>
                        </div>
                        <p>{userData.streak}</p>
                    </div>
                    <div className="stats">
                        <div className="icon">
                            <IoMdCheckboxOutline style={{ color: '#A00120' }} />
                            <p>Role</p>
                            {/* Should change this to completed tasks in future */}
                        </div>
                        <p>{userData.role}</p>
                    </div>

                    <div className="stats">
                        <div className="icon">
                            <CiStar style={{ color: '#A00120' }} />
                            <p>Rank</p>
                        </div>
                        <p>{userData.rank}</p>
                    </div>

                    {/* XP Bar */}
                    <div className="xp-bar">
                        <LinearProgress variant="determinate" value={userData.XP % 100} sx={{
                            width: '70%',
                            height: '15px',
                            border: '1px solid black',
                            borderRadius: '2px',
                            backgroundColor: '#E0E0E0',
                        }} />
                        <p>xp to next rank: {100 - (userData.XP % 100)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
