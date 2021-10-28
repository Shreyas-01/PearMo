import './ProfileSettings.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../../utils/constants';
import { UserDataContext } from '../../../App';
import NavBar from '../../Main/NavBar/NavBar';
import Footer from '../../Footer/Footer';

const ProfileSettings = () => {
    const {userData, setUserData} = useContext(UserDataContext);
    const [user, setUser] = useState();

    useEffect(() => {
        const uriprofile = `${baseUrl}profile/614a1aa4b1003d18fc2729a3`;

        axios.get(uriprofile, axiosHeaders)
            .then(result => {
                setUser(user => result.data.user);
            })
            .catch(error => {
                console.log("Profile could not be fetched from backend.", error);
            });
    }, [])

    const patchRequest = () => {
        const uriprofile = `${baseUrl}profile/614a1aa4b1003d18fc2729a3`;
        
        axios.patch(uriprofile, user, axiosHeaders)
        .then(result => {
            console.log("Change successful", result);
        })
        .catch(error => {
            console.log("Profile could not be updated.", error);
        });
    }

    if(user !== undefined) {
        return (
            <div className="flex-container main">
                <NavBar />

                <div className="container-fluid profile-settings">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">

                                <div className="card-body">
                                    <div className="account-settings">
                                        <div className="user-profile">
                                            <div className="user-avatar">
                                                <img src={user.image} alt="Maxwell Admin" />
                                            </div>
                                            <h5 className="user-name">{user.firstName} {user.lastName}</h5>
                                            <h6 className="user-email">{user.email}</h6>
                                        </div>
                                        <div className="about">
                                            <h5>About</h5>
                                            <p>{user.about}</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h4 className="mb-2 text-primary ">Profile</h4>
                                            <p>This information will be displayed publicly so be careful what you share.</p>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label for="firstName">First Name</label>
                                                <input type="text" className="form-control" id="firstName" placeholder={user.firstName}/>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label for="lastName">Last Name</label>
                                                <input type="text" className="form-control" id="lastname" placeholder={user.lastName}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label for="eMail">Email</label>
                                                <input type="email" className="form-control" id="email" placeholder={user.email}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label for="username">Username</label>
                                                <input type="text" className="form-control" id="username" placeholder={user.username}/>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label for="password">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="******"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label for="password">Confirm Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="******"/>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className="row submit-buttons">
                                        <div className=" col-xl-1 col-lg-1 col-md-3 col-sm-3 col-3">
                                            <button type="button" id="submit" name="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    else {
        return (
            <div className="account">Loading...</div>
        );
    }
}

export default ProfileSettings;