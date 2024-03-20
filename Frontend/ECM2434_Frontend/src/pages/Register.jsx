
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import ApiClient from "../api/index";
import { useUser } from "../contexts/userContext";
import { CiWarning } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./authPages.css";



const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // TODO: Include regex checks here

        if (password.length > 7) {
            setPasswordValid(true);
            setPasswordError('');
        } else {
            setPasswordValid(false);
            setPasswordError('Password must be at least 8 characters long');
        }
    }, [password]);

    useEffect(() => {

        if (repeatPassword === password) {
            setRepeatPasswordValid(true);
            setRepeatPasswordError('');
        } else {
            setRepeatPasswordValid(false);
            setRepeatPasswordError('Passwords do not match');
        }
    }, [password, repeatPassword]);

    useEffect(() => {

        // TODO: verify email for edu email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setEmailValid(true);
            setEmailError('');
        } else {
            setEmailValid(false);
            setEmailError('Invalid email address.');
        }
    }, [email]);



    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(data)
        console.log(username)
        ApiClient.api.register(email, username, password, firstName, lastName).then((res) => {
            console.log(res)
            console.log("Registered")
            toast.success("Registration successful! Please verify your email.");
            navigate('/login');
        }).catch((error) => {
            console.log(error);
            console.log(error.response.data)
            toast.error("Registration failed: " + error.response.data.message);
        });
    }

    return (
        <>
            <div className="page">
                <div className="containerBox">
                    <h1>Register</h1>
                    <form onSubmit={onSubmit}>
                        <div className="fields">
                            <div className="names">
                             <TextField 
                                label="First Name" 
                                variant="outlined" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)} 
                                margin="normal" 
                                sx={{ 
                                    width: 'calc(50% - 5px)', 
                                    '& .MuiOutlinedInput-input': { 
                                        padding: '14px 10px', 
                                    }, 
                                    marginRight: '10px', 
                                }} 
                            />
                             <TextField 
                                label="Last Name" 
                                variant="outlined" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} 
                                margin="normal" 
                                sx={{ 
                                    width: 'calc(50% - 5px)', 
                                    '& .MuiOutlinedInput-input': { 
                                        padding: '14px 10px', 
                                    }, 
                                }} 
                            />
                        </div>
                            <TextField 
                                label="Username" 
                                variant="outlined" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                fullWidth 
                                margin="normal" 
                                sx={{ 
                                    '& .MuiOutlinedInput-input': { 
                                        padding: '14px 10px', 
                                    }
                                }} 
                            />
                            <TextField 
                                label="Email" 
                                type="email" 
                                variant="outlined" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                fullWidth 
                                margin="normal" 
                                sx={{ 
                                    '& .MuiOutlinedInput-input': { 
                                        padding: '14px 10px', 
                                    }
                                }} 
                            />
                            <TextField 
                                label="Password" 
                                type="password" 
                                variant="outlined" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                fullWidth 
                                margin="normal" 
                                sx={{ 
                                    '& .MuiOutlinedInput-input': { 
                                        padding: '14px 10px', 
                                    }
                                }} 
                            />
                            <TextField 
                                label="Repeat Password" 
                                type="password" 
                                variant="outlined" 
                                value={repeatPassword} 
                                onChange={(e) => setRepeatPassword(e.target.value)} 
                                fullWidth 
                                margin="normal" 
                                sx={{ 
                                    '& .MuiOutlinedInput-input': { 
                                        padding: '14px 10px', 
                                    }, 
                                }} 
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!(emailValid && passwordValid && repeatPasswordValid)}
                                    sx={{
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        padding: '10px 90px',
                                        minWidth: '150px',
                                        'margin-bottom': '20px',
                                        backgroundColor: 'green',
                                        '&:hover': {
                                          backgroundColor: '#045d04',
                                        },
                                      }}
                                >
                                    Register
                                </Button>
                            </div>
                            <p className="switchPage">Already have an account? <span><NavLink to="/login">Login</NavLink></span></p>
                        </div>
                        <div className="errors">
                            {email && emailError && <div className="error"><CiWarning /><p >{emailError}</p> </div>}
                            {password && passwordError && <div className="error"><CiWarning /><p>{passwordError}</p></div>}
                            {repeatPassword && repeatPasswordError && <div className="error"><CiWarning /><p>{repeatPasswordError}</p></div>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};


export default Register;
