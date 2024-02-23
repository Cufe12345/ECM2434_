import { NavLink } from "react-router-dom";
import "./authPages.css";
import { useEffect } from "react";
import { useState } from "react";
import ApiClient from "../api/index";
import { useUser } from "../contexts/userContext";

const Register = () => {

    const { setUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [repeatPasswordValid, setRepeatPasswordValid] = useState(false);

    useEffect(() => {
        // TODO: Include regex checks here

        if (password.length > 7) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    }, [password]);

    useEffect(() => {

        if (repeatPassword === password) {
            setRepeatPasswordValid(true);
        } else {
            setRepeatPasswordValid(false);
        }
    }, [password, repeatPassword]);

    useEffect(() => {

        // TODO: verify email for edu email
        if (email.includes('@') && email.includes('.')) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
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
                        <p>Already have an account? <span><NavLink to="/login">Login</NavLink></span></p>
                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default Register;