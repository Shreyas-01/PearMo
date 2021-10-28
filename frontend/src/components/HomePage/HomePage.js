import './HomePage.css';
import React from 'react';
import { Link } from "react-router-dom";
import one from './one.png';
import two from './two.png';
import three from './three.png';

const HomePage = () => {
    return (
        <div className="homepage container-fluid">
            <div className="homepage-navbar">
                <div className="homepage-navbar-image">
                    <img src="./Bpearmo.png"></img>
                </div>

                <div className="links">
                    <button type="button" className="btn joinus-button"><Link to="/joinus">Join us</Link></button>
                    <button type="button" className="btn login-button"><Link to="/login">Login</Link></button>
                </div>
            </div>

            <div className="motto">
                <h1><span>Empowering</span> Creators, Businesses <span>and</span> Freelancers</h1>
                <p><span>Join</span> the team now!</p>
            </div>

            <div className="slide-container">
                <div>
                    <img src={one} />
                </div>
                <div>
                    <img src={two} />
                </div>
                <div>
                    <img src={three} />
                </div>
            </div>

            <div className="homepage-types">
                <div className="row">
                    <div className="col-lg-6 homepage-creators">
                        <h1>Creators</h1>
                        <h5>Lorem ipsum</h5>
                    </div>
                    <div className="col-lg-6">
                        <img src={one}></img>
                    </div>
                </div>
            </div>

            <div className="homepage-types">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={two}></img>
                    </div>
                    <div className="col-lg-6 homepage-businesses">
                        <h1>Businesses</h1>
                        <h5>Lorem ipsum</h5>
                    </div>
                    
                </div>
            </div>

            <div className="homepage-types">
                <div className="row">
                    <div className="col-lg-6 homepage-freelancers">
                        <h1>Freelancers</h1>
                        <h5>Coming soon...</h5>
                    </div>
                    <div className="col-lg-6">
                        <img src={three}></img>
                    </div>
                </div>
            </div>

            <div className="homepage-footer">
                <h5>2021 PearMo</h5>
                <h6>Made in India</h6>
                <div className="icons">
                    <i className="fab fa-facebook-f fa-lg" onClick={() => window.location.href = 'https://www.facebook.com/'}></i>
                    <i className="fab fa-twitter fa-lg" onClick={() => window.location.href = 'https://www.twitter.com/'}></i>
                    <i className="fab fa-instagram fa-lg" onClick={() => window.location.href = 'https://www.instagram.com/'}></i>
                    <i className="fab fa-snapchat-ghost fa-lg" onClick={() => window.location.href = 'https://www.snapchat.com/'}></i>
                </div>
            </div>
        </div>
    );
}

export default HomePage;