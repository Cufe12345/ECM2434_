
import { NavLink } from "react-router-dom";
import "./authPages.css";
import { useEffect } from "react";
import { useState } from "react";
import ApiClient from "../api/index";
import { useUser } from "../contexts/userContext";
import { CiWarning } from "react-icons/ci";


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

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
        ApiClient.api.register(email, username, password).then((res) => {
            console.log(res)
            console.log("Registered")
            // navigate('/');
        }).catch((error) => {
            console.log(error);
        });

    }

    return (<>
        <div className="page">
            <div className="containerBox">
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                    <div className="fields">
                        <div className="names">
                            <input type="text" placeholder="First Name" />
                            <input type="text" placeholder="Last Name" />
                        </div>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                        <button disabled={!(emailValid && passwordValid && repeatPasswordValid)}>Register</button>
                        <p className="switchPage">Already have an account? <span><NavLink to="/login">Login</NavLink></span></p>
                    </div>
                    <div className="errors">
                        {email && emailError && <div className="error"><CiWarning /><p >{emailError}</p> </div>}
                        {password && passwordError && <div className="error"><CiWarning /><p >{passwordError}</p> </div>}
                        {repeatPassword && repeatPasswordError && <div className="error"><CiWarning /><p >{repeatPasswordError}</p> </div>}
                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default Register;
