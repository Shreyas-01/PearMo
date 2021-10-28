import './Profile.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams} from "react-router-dom";
import { baseUrl, axiosHeaders } from '../../utils/constants';
import { UserDataContext } from '../../App';
import NavBar from '../Main/NavBar/NavBar';
import Footer from '../Footer/Footer';

const Profile = () => {
    
    const {userData, setUserData} = useContext(UserDataContext);
    const [category, setCategory] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const uriprofile = `${baseUrl}profile/614a1aa4b1003d18fc2729a3`;
        console.log(userData);
        axios.get(uriprofile, axiosHeaders)
            .then(result => {
                setUser(user => result.data.user);
                setCategory(category => result.data.category);
                
            })
            .catch(error => {
                console.log("Profile could not be fetched from backend.", error);
            });
    }, [])

    if(user !== undefined && category !== undefined) {
        return (
            <div className="account">
                <NavBar />

                <div className="container-fluid data">
                    <h5>{user.username}</h5>
                    <h5>{user.firstName}</h5>
                    <h5>{user.middleName}</h5>
                    <h5>{user.lastName}</h5>
                    <h5>{user.dob}</h5>
                    <h5>{user.image}</h5>
                    <h5>{category.following.length}</h5>
                    <h5>{category.followers.length}</h5>
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
};

export default Profile;