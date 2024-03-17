import { useUser } from '../contexts/userContext';
import { useCookies } from 'react-cookie';
import ApiClient from "../api/index";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const navigate = useNavigate();
    const { userData } = useUser(); // Use the userData from context if needed
    const [cookies] = useCookies(['authToken']); // Replace 'authToken' with the name of your cookie that holds the token

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        // Prefill the form with existing user data if necessary
        if (userData) {
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setBirthday(userData.birthday); // Make sure the format matches that of the date input
            setBio(userData.bio);
        }
    }, [userData]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const authToken = cookies.authToken; // Replace with your actual token key
        const data = {
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
            bio: bio
        };
        // Ensure modifyUser function uses the token for authorization
        ApiClient.modifyUser(authToken, data).then((res) => {
            toast.success("Profile updated successfully!");
            navigate('/profile');
        }).catch((error) => {
            console.error(error);
            toast.error("Profile update failed: " + error.response.data.message);
        });
    };

    return (<>
        <div>
            <form onSubmit={onSubmit}>
                    <div className="fields">
                        <div className="names">
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <input type="text" placeholder="Bio" value={bio} onChange={(e) => setbio(e.target.value)} />
                        <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setbirthday(e.target.value)} />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
        </div>
        </> );
}

export default EditProfile;