import { useUser } from '../contexts/userContext';
import ApiClient from "../api/index";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './Edit.module.css';
import LogoImage from '../assets/images/logo.png'; 

const EditProfile = () => {
    const navigate = useNavigate();
    const { userData , user} = useUser();

    const [profileImg, setProfileImg] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        // Set the initial state of inputs if userData is available
        if (userData) {
            setProfileImg(userData.profileImg || '');
            setFirstName(userData.first_name || '');
            setLastName(userData.last_name || '');
            setBirthday(userData.birthday || '');
            setBio(userData.bio || '');
        }
    }, [userData]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            profileImg: profileImg,
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
            bio: bio
        };
        // Ensure modifyUser function uses the token for authorization
        ApiClient.api.modifyUser(user, data).then((res) => {
            toast.success("Profile updated successfully!");
            navigate('/profile');
        }).catch((error) => {
            console.error(error);
            toast.error("Profile update failed: " + error.response.data.message);
        });
    };

    return (
    <>
        <form onSubmit={onSubmit} className={classes['edit-form']}>
            <div className={classes.profilePicSection}>
                <h5>Profile Picture</h5>
                <img src={LogoImage} alt="image" className={classes.profilePic}/>
                <u><h5 onClick={() => navigate('/profile/edit/upload')}  className={classes.uploadLink}>Upload</h5></u>
                
            </div>
            <div className={classes.names}>
                <h5>First Name</h5>
                <input type="text" placeholder={firstName}  onChange={(e) => setFirstName(e.target.value)} />
                <h5>Last Name</h5>
                <input type="text" placeholder={lastName}  onChange={(e) => setLastName(e.target.value)} />
                <h5>Birthday</h5>
                <input type="text" placeholder={birthday} onChange={(e) => setBirthday(e.target.value)} />
                <h5>Bio</h5>
                <textarea placeholder={bio} onChange={(e) => setBio(e.target.value)} />
                <button type="submit" className={classes['update-profile-button']}>Update Profile</button>
            </div>
        </form>
    </>
    );
}

export default EditProfile;