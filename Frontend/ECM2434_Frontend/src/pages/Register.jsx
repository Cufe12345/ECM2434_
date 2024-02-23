import { NavLink } from "react-router-dom";
import "./authPages.css";

const Register = () => {
    return (<>
        <div className="page">
            <div className="containerBox">
                <h1>Register</h1>
                <form>
                    <div className="fields">
                        <input type="text" placeholder="Username" />
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Repeat Password" />
                        <button>Register</button>
                        <p>Already have an account? <span><NavLink to="/login">Login</NavLink></span></p>
                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default Register;