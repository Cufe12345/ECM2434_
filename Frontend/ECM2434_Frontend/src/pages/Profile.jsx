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
import {useParams} from "react-router-dom";
import { FriendList } from "../components/friendList";

const Profile = () => {
    const { id } = useParams();
    const { user, userData,userDataLoading } = useUser();
    const [apiUserData, setapiUserData] = useState(null);
    const [apiUserDataLoading, setapiUserDataLoading] = useState(true);
    console.log("hello 1");
    console.log();
    // console.log(ApiClient.api.fetchFriends(user));

    const [username, setUsername] = useState(0);
    const [friendAdded, setFriendAdded] = useState(false);
    const [friends, setFriends] = useState([]);
    const [friendUsernames, setFriendUsernames] = useState([]);
    console.log(id);

    useEffect(() => {
        if (userData){
        if (id=="me"){
            setUsername(userData.username);
            console.log("its me",userData.username);
        }
        else {
            
            setUsername(id);}
        }   
    }, [userData]);

    useEffect(() => {
        console.log("HELLO");
        if (userData && username){
        console.log("HELLO2");
        console.log("abcded", username);
        // Set loading to true when the component mounts
        ApiClient.api.fetchUsernameData({ "username": username}, user)
            .then((res) => {
                console.log("REACHED@@@",res);
                if(res.error){
                    setUsername(null);
                }
                setapiUserData(res);
                setapiUserDataLoading(false);
            })
            .catch((error) => {
                console.log("REACHED!!!!: ",error);
                // if users not found, set  username to null
                setUsername(null);
                setapiUserDataLoading(false);
            });
        }
    }, [userData, username]);

    useEffect(() => {
        if(username && userData){
            ApiClient.api.fetchFriends(user, {user1 : username}).then((res) => {
                setFriends(res);
                console.log("pk: ",res);
                if (res.some((friend) => friend.user2 === userData.id || friend.user1 === userData.id)){
                    setFriendAdded(true);
                    console.log("FRIEND ADDED");
                }
                
            }).catch((error) => {
                console.log(error);
            });

        }
    }, [user,userData,username]);

    useEffect(() => {
        console.log("VAL",apiUserData);
    }, [apiUserData]);
    //const { id } = useParams();

    useEffect(() => {
        if (user && username){
        console.log("kjdal;k", friends)
        ApiClient.api.fetchAllUsers(user)
            .then((res) => {
                console.log("User data",res);
                
                res = res.filter((user1) => {
                    if (friends.some((friend) => friend.user1 === user1.id || friend.user2 === user1.id)){
                        return true;
                    }
                    return false;
                });
                setFriendUsernames([]);
                res.forEach((user1) => {
                    if (username != user1.username)
                    {
                    setFriendUsernames((friendUsernames) => [...friendUsernames, user1.username]);
                    }
                });
              })
            .catch((error) => {
                console.log("REACHED!!!!: ",error);
                // if users not found, set  username to null
                
            });
        
        }}, [friends, user, username]);
    function addFriend(){
        console.log("ADD FRIEND");
        if(user && userData){
            ApiClient.api.addFriend(user, {user1 : userData.id, user2 : apiUserData.id}).then((res) => {
                setFriendAdded(true);
            }).catch((error) => {
                console.log(error);
            });

        }
    }

    return (
        <>
            {!(apiUserDataLoading == false && apiUserData != null) ? (<h1>Loading...</h1>) : username===null ? (<h1>Error username not found</h1>) : (

            <div className="container">
                <FriendList friends={friendUsernames} user={user} />

                <div className="profile">
                    <div className="header">
                        <Avatar alt="User Profile Picture" src="/path/to/profile-picture.jpg" sx={{ width: 150, height: 150 }} />
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