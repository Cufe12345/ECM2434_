import { useUser } from '../contexts/userContext';
import ApiClient from "../api/index";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './Edit.module.css';
import LogoImage from '../assets/images/logo.png'; 
import { PlayerIcon } from '../components/playerIcon';
import { BorderSelector } from '../components/borderSelector';

const EditProfile = () => {
    const navigate = useNavigate();
    const { userData , user,fetchUserData} = useUser();

    const [imgURL, setimgURL] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [bio, setBio] = useState('');

    const [borders, setBorders] = useState([]);
    const [selectedBorder, setSelectedBorder] = useState(0);
    const [imgUser, setImgUser] = useState(null);

    useEffect(() => {
        // Set the initial state of inputs if userData is available
        if (userData) {
            setimgURL(userData.imgURL|| '');
            setFirstName(userData.first_name || '');
            setLastName(userData.last_name || '');
            setBirthday(userData.birthday || null);
            setBio(userData.bio || '');
        }
    }, [userData]);

    useEffect(() => {
        if (userData && userData.profileImg) {
            setimgURL(userData.profileImg);
        }
        // Retrieve the uploaded image path from local storage
        const uploadedProfilePicPath = localStorage.getItem('uploadedProfilePicPath');
        if (uploadedProfilePicPath) {
            setimgURL(uploadedProfilePicPath);
            //localStorage.removeItem('uploadedProfilePicPath'); // Clean up after using
        }
    }, [userData]);

    // useEffect(() => {
    //     let data = [...userData, imgURL:imgURL];
    //     setImgUser(userData);

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            imgURL: imgURL,
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
            bio: bio,
            border: borders[selectedBorder]
        };
        // Ensure modifyUser function uses the token for authorization
        ApiClient.api.modifyUser(user, data).then((res) => {
            console.log(data);
            localStorage.removeItem('uploadedProfilePicPath');
            toast.success("Profile updated successfully!");
            fetchUserData();
            navigate('/profile/me');
        }).catch((error) => {
            console.error(error);
            toast.error("Profile update failed: " + error.response.data.message);
        });
    };

    return (
    <>
    <div className={classes.container}>
        <form onSubmit={onSubmit} className={classes['edit-form']}>
            <div className={classes.profilePicSection}>
                <h5>Profile Picture</h5>
                {/* <img src={'http://localhost:8000' + imgURL|| LogoImage} alt="profile" className={classes.profilePic}/> */}
                <div className={classes.profilePicContainer}>
                <PlayerIcon userData={{...userData,imgURL:imgURL}} width={250} height={250} />
                </div>
                <u><button onClick={() => navigate('/profile/edit/upload')}  className={classes.uploadLink}>Upload</button></u>
                
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
                <h5>Border</h5>
                <BorderSelector userData={{...userData,imgURL:imgURL}} borders={borders} setBorders={setBorders} selectedBorder={selectedBorder} setSelectedBorder={setSelectedBorder}/>
                <button type="submit" className={classes['update-profile-button']}>Update Profile</button>
            </div>
        </form>
    </div>
    </>
    );
}

export default EditProfile;