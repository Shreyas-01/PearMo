import './Login.css';
import React, { useContext } from 'react';
import { UserDataContext } from '../../App';
import { Link } from 'react-router-dom';

const Login = () => {
    const {userData, setUserData} = useContext(UserDataContext);
    return (
        <div className="login">
            <div className="modal-center">
                <div className="login-text">
                    <Link to="/login" className="login-link">Sign In</Link>
                    <br />
                    <Link to="/signup" className="signup-link">Sign up</Link>
                </div>
                <div className="slanted">
                    <div>
                        PearMo`
                    </div>
                </div>
                <div className="form">
                    <Link to="/" className="move-back btn btn-light">
                        <i class="fas fa-times"></i>
                    </Link>
                    <br />
                    <div className="container form-block">
                        <label className="label-email">Email Address</label>
                        <input name="email" type="email"></input>
                        <label className="label-email">Password</label>
                        <input name="email" type="text"></input>
                        <br/>
                        <button className="btn btn-primary">Login</button>
                        <div className="forgot-password">Forgot Password?</div>
                    </div>
                    <hr className="divider" />
                    <div className="other-options container d-flex justify-content-around">
                        <i class="fab fa-google"></i>
                        <i class="fab fa-facebook"></i>
                        <i class="fab fa-twitter"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;