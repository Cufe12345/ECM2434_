import { useUser } from '../contexts/userContext';
import { useCookies } from 'react-cookie';
import ApiClient from "../api/index";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const navigate = useNavigate();
    const { userData , user} = useUser(); // Use the userData from context if needed
    //const [cookies] = useCookies(['authToken']); // Replace 'authToken' with the name of your cookie that holds the token

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setbirthday] = useState('');
    const [bio, setbio] = useState('');
    const [placeholders, setPlaceholders] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        bio: '',
    });

    useEffect(() => {
        // Set placeholders to the current user data
        if (userData) {
            setPlaceholders({
                firstName: userData.first_name,
                lastName: userData.last_name,
                birthday: userData.birthday, // Make sure the format matches that of the date input
                bio: userData.bio,
            });
        }
    }, [userData]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
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

    return (<>
        <div>
            <form onSubmit={onSubmit}>
                    <div className="fields">
                        <div className="names">
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setbirthday(e.target.value)} />
                        <input type="text" placeholder="Bio" value={bio} onChange={(e) => setbio(e.target.value)} />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
        </div>
        </> );
}

export default EditProfile;