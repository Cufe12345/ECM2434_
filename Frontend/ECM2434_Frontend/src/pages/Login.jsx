import { NavLink } from "react-router-dom";
import "./authPages.css";

const Login = () => {
    return (<>
        <div className="page">
            <div className="containerBox">
                <h1>Login</h1>
                <form>
                    <div className="fields">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button>Login</button>
                        <p>Don't have an account? <span><NavLink to="/register">Register</NavLink></span></p>
                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default Login;