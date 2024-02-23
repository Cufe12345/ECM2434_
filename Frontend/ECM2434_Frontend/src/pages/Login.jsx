import { NavLink } from "react-router-dom";
import "./authPages.css";
import { useUser } from "../contexts/userContext";
// import toast  from "react-toastify";
// import { navigate } from "react-router-dom";
import { useState } from "react";
import ApiClient from "../api/index";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { setUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(data)
        console.log(username)
        // ApiClient.api.testRequest().then((res) => {
        //     console.log(res);
        // }
        // ).catch((error) => {
        //     console.log(error);
        // });
        ApiClient.api.login(username, password).then((res) => {
            console.log(res)
            setUser(res.auth_token);
            // toast.success('Login successful');
            navigate('/');
        }).catch((error) => {
            console.log(error);
            // toast.error(`Login failed - ${error.response.detail ?? 'Contact support'}`);
        });
        //   setUser({
        //     info: {
        //       id: res.id,
        //       email: res.email,
        //       role: res.role,
        //     },
        //     isLoggedIn: true,
        //   });
        //   toast.success('Login successful');
        //   navigate('/');
        // })
        //   .catch((error) => {
        //     console.log(error);
        //     toast.error(`Login failed - ${error.response.detail ?? 'Contact support'}`);
        //   });
    }
    return (<>
        <div className="page">
            <div className="containerBox">
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="fields">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button>Login</button>
                        <p>Don't have an account? <span><NavLink to="/register">Register</NavLink></span></p>
                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default Login;