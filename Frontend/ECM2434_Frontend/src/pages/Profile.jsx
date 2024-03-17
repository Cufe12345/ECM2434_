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
import level1 from '../assets/images/Level1.png'; 
import level2 from '../assets/images/Level2.png';
import level3 from '../assets/images/Level3.png';
import level4 from '../assets/images/Level4.png'; 
import level5 from '../assets/images/Level5.png';
import level6 from '../assets/images/Level6.png';
import level7 from '../assets/images/Level7.png'; 
import level8 from '../assets/images/Level8.png';
import level9 from '../assets/images/Level9.png';
import level10 from '../assets/images/Level10.png';
import { PlayerIcon } from "../components/playerIcon";


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

    const levelImages = {
        1: level1,
        2: level2,
        3: level3,
        4: level4,
        5: level5,
        6: level6,
        7: level7,
        8: level8,
        9: level9,
        10: level10,
      };

    return (
        <>
            {userDataLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="container2">
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
                                    {/* <CiStar style={{ color: '#A00120' }} /> */}
                                    <img src={levelImages[apiUserData.rank] || levelImages[1]} alt="Level Icon" className="level-icon" />
                                    <p>Level</p>
                                </div>
                                <p>{apiUserData.rank}</p>
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
