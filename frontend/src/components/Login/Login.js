import './Login.css';
import React, { useContext, useState, useEffect } from 'react';
import { UserDataContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../utils/constants';

const Login = () => {
    const {userData, setUserData} = useContext(UserDataContext);
    const [passwd, setPasswd] = useState('');
    const [email,setEmail] = useState('');
    const history = useHistory();
    
    const handleLogin = async () => {
        const urilogin = `${baseUrl}login`;

        axios.post(urilogin, {email : email, password : passwd}, axiosHeaders)
            .then(result => {
                setUserData(userData =>result.data.user);

                console.log("Login successful");
                history.push('/main/feed');
            })
            .catch(error => {
                console.log("Login failed", error);
            });
    };

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
                        <i className="fas fa-times"></i>
                    </Link>
                    <br />
                    <div className="container form-block">
                        <label className="label-email">Email Address</label>
                        <input name="email" type="email" onChange={e => setEmail(email => e.target.value)}></input>
                        <label className="label-email">Password</label>
                        <input name="passwd" type="password" onChange={e => setPasswd(passwd => e.target.value)}></input>
                        <br/>
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        <div className="forgot-password">Forgot Password?</div>
                    </div>
                    <hr className="divider" />
                    <div className="other-options container d-flex justify-content-around">
                        <i className="fab fa-google"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;