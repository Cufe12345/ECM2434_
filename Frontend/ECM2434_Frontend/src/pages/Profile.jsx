import "./profile.css"
import Avatar from '@mui/material/Avatar';
import { IoFlameSharp } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import ApiClient from "../api/index";
import { useState } from "react";
import { useUser } from "../contexts/userContext";

const Profile = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [userDataLoading, setUserDataLoading] = useState(true);

    const username = "test0";
    console.log(user)

    ApiClient.api.fetchUsernameData({ "username": username }, user).then((res) => {
        console.log(res)
        setUserData(res);
        setUserDataLoading(false);
    }
    ).catch((error) => {
        console.log(error);
        setUserDataLoading(false);
    });


    const progress = 50;
    return (
        <div className="container">
            <div className="profile">
                <div className="header">
                    <Avatar alt="User Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 150, height: 150 }} />
                    <h1>Full Name</h1>
                    <h2> Username </h2>
                </div>
                <div className="icons">
                    <div className="stats">
                        <div className="icon">
                            <IoFlameSharp style={{ color: '#A00120' }} />
                            <p>Streak</p>
                        </div>
                        <p>42</p>
                    </div>
                    <div className="stats">
                        <div className="icon">
                            <IoMdCheckboxOutline style={{ color: '#A00120' }} />
                            <p>Completed</p>
                        </div>
                        <p>42</p>
                    </div>

                    <div className="stats">
                        <div className="icon">
                            <CiStar style={{ color: '#A00120' }} />
                            <p>Rank</p>
                        </div>
                        <p>11</p>
                    </div>

                    {/* XP Bar */}
                </div>
            </div>
        </div>
    );
}

export default Profile;