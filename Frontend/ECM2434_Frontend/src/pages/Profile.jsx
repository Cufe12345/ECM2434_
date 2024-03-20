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

import {useParams} from "react-router-dom";
import { FriendList } from "../components/friendList";

const Profile = () => {
    // Gets the username specified in the URL
    const { id } = useParams();
    // Retrieves the user data
    const { user, userData,userDataLoading } = useUser();
    const [apiUserData, setapiUserData] = useState(null);
    const [apiUserDataLoading, setapiUserDataLoading] = useState(true);
    
    // Username of the profile being viewed
    const [username, setUsername] = useState(null);
    // Whether the user is already a friend
    const [friendAdded, setFriendAdded] = useState(false);
    // Gets the list of friends' ids
    const [friends, setFriends] = useState([]);
    // Gets the list of friends' data
    const [friendUserData, setFriendUserData] = useState([]);


    useEffect(() => {
        if (userData){
            // If the id is me, then set the username to the current user 
            if (id=="me"){
                setUsername(userData.username);
            }
            else {
                setUsername(id);
            }
            }   
    }, [userData]);

    useEffect(() => {
        if (userData && username){ 
            getUserDataFromUsername();
        }
    }, [userData, username]);

    useEffect(() => {
        if(username && userData){
            setAllFriends();
        }
    }, [user,userData,username]);

    useEffect(() => {
        if (user && username){
            getAllFriendsData();
       
        
        }}, [friends, user, username]);

    function setAllFriends(){
        // Gets all the friends of the current user and checks if the user is already a friend
        ApiClient.api.fetchFriends(user, {user1 : username}).then((res) => {
                
            // Sets the friends to the response
            setFriends(res);

            // Checks if the friend is already added so that the button can be disabled
            if (res.some((friend) => friend.user2 === userData.id || friend.user1 === userData.id)){
                setFriendAdded(true);
            }
            
        }).catch((error) => {
            console.log(error);
        });
    }

    function getAllFriendsData(){
        ApiClient.api.fetchAllUsers(user)
        .then((res) => {
            // Filters the users to only show the friends of the user which profile is viewed                
            res = res.filter((user1) => {
                if (friends.some((friend) => friend.user1 === user1.id || friend.user2 === user1.id)){
                    return true;
                }
                return false;
            });

            // Sets the friendUserData variables to the user data of each friend
            setFriendUserData([]);
            res.forEach((user1) => {
                // Do not include the current user in the list of friends
                if (username != user1.username)
                {
                setFriendUserData((friendUserData) => [...friendUserData, user1]);
                }
            });
          })
        .catch((error) => {
            console.log(error);
            
        });
    }

    function addFriend(){
        if(user && userData){
            
            ApiClient.api.addFriend(user, {user1 : userData.id, user2 : apiUserData.id}).then((res) => {
                // Once clicked, the button will be disabled, as they will have a new friend
                setFriendAdded(true);
                // Adds the new friend to the list of friends
                setFriends((friends) => [...friends, res]);
            }).catch((error) => {
                console.log(error);
            });

        }
    }
    function getUserDataFromUsername(){
        // fetches username data from either the current user or the user being viewed
        ApiClient.api.fetchUsernameData({ "username": username}, user)
            .then((res) => {
                if(res.error){
                    setUsername(null);
                }
                setapiUserData(res);
                setapiUserDataLoading(false);
            })
            .catch((error) => {
                // if users not found, set  username to null
                setUsername(null);
                setapiUserDataLoading(false);
            });
    }
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
            {!(apiUserDataLoading == false && apiUserData != null) ? (<h1>Loading...</h1>) : username===null ? (<h1>Error username not found</h1>) : (

            <div className="container3">
                <FriendList friends={friendUserData} user={user} />

                <div className="profile">

                    <div className="header">
                        <Avatar alt="User Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 150, height: 150 }} />
                        
                        
                    </div>
                    <div className="names">
                    <div>
                    <h1>{apiUserData?.first_name + ' ' + apiUserData?.last_name}</h1>
                    <h2> {apiUserData?.username} </h2>
                    </div>
                    { id == "me" && <div className="buttonContainer">
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
                    </div>}
                    { id != "me" && <div className="buttonContainer">
                        <Button onClick={addFriend} variant="contained" sx={
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
                        } disabled={friendAdded} > Add Friend</Button>
                    </div>}
                   
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