import React,{ useContext } from 'react';
import './NavBar.css';
import { UserDataContext } from '../../../App';
import { useHistory } from 'react-router';

const NavBar = () => {
    const {userData} = useContext(UserDataContext); 
    const history = useHistory();
    console.log(userData)

    return (
        <div className="container-fluid navbar">
            <div className="navbar-logo col-8">
                <img alt="unavailable" src="/Wpearmo.png" onClick={() => history.push('/')}></img>
            </div>

            <div className="navbar-items col-2">
                <i className="fas fa-user fa-lg"></i>
                <i className="fas fa-bell fa-lg"></i>
                <i className="fas fa-comment fa-lg"></i>
            </div>

            <div className="navbar-profile col-2">
                <div className="profile-text">
                    <p>Masha Raymers</p>
                </div>
                <div className="profile-image">
                    <img alt="unavailable" src="https://drive.google.com/uc?export=view&id=1DVhHrkvFLWg88X2HLF7_NdbDzeJs0C3E" />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
