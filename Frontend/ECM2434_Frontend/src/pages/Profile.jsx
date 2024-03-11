import "./profile.css"
import Avatar from '@mui/material/Avatar';
import { IoFlameSharp } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import ApiClient from "../api/index";
import { useState } from "react";
import { useUser } from "../contexts/userContext";
import { useEffect } from "react";
import { LinearProgress } from "@mui/material";
import Button from '@mui/material/Button';
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const Profile = () => {
    const { user, userData } = useUser();
    const [apiUserData, setapiUserData] = useState({});
    const [userDataLoading, setuserDataLoading] = useState(true);

    console.log(userData)

    useEffect(() => {
        if (userData && userData.username) {
            setuserDataLoading(true); // Move this inside the if statement to only set it when loading starts
            ApiClient.api.fetchUsernameData({ "username": userData.username }, user)
                .then((res) => {
                    console.log(res);
                    setapiUserData(res);
                    setuserDataLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setuserDataLoading(false);
                });
        } else {
            setuserDataLoading(false); // Consider what you want to do if there's no user data. Maybe handle this differently.
        }
    }, [userData, user]);

    return (
        <>
            {userDataLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    <div className="profile">
                        <div className="header">
                            <Avatar alt="User Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 150, height: 150 }} />
                            <h1>{apiUserData.first_name + ' ' + apiUserData.last_name}</h1>
                            <h2> {apiUserData.username} </h2>
                        </div>
                        <div className="buttonContainer">
                            <NavLink to="/profile/edit">
                                <Button variant="contained" sx={
                                    {
                                        height: '40px',
                                        color: '#000000',
                                        border: '1px solid #000000',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        backgroundColor: '#EDF0EC',
                                        '&:hover': {
                                            backgroundColor: '#EAFCE8',
                                            opacity: '0.8'
                                        }
                                    }
                                }> <FaUserEdit style={{ marginRight: '5px' }} />
                                    Edit Profile</Button>
                            </NavLink>
                        </div>
                        <div className="icons">
                            <div className="stats">
                                <div className="icon">
                                    <IoFlameSharp style={{ color: '#A00120' }} />
                                    <p>Streak</p>
                                </div>
                                <p>{apiUserData.streak}</p>
                            </div>
                            <div className="stats">
                                <div className="icon">
                                    <IoMdCheckboxOutline style={{ color: '#A00120' }} />
                                    <p>Role</p>
                                    {/* Should change this to completed tasks in future */}
                                </div>
                                <p>{apiUserData.role}</p>
                            </div>

                            <div className="stats">
                                <div className="icon">
                                    <CiStar style={{ color: '#A00120' }} />
                                    <p>Level</p>
                                </div>
                                <p>{Math.floor(apiUserData.XP / 100)}</p>
                            </div>

                            {/* XP Bar */}
                            <div className="xp-bar">
                                <LinearProgress variant="determinate" value={apiUserData.XP % 100} sx={{
                                    width: '70%',
                                    height: '15px',
                                    border: '1px solid black',
                                    borderRadius: '2px',
                                    backgroundColor: '#E0E0E0',
                                }} />
                                <p>xp to next rank: {100 - (apiUserData.XP % 100)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
