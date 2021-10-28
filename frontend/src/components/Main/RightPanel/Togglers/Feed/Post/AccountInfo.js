import './account-info.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../../../../../utils/constants';

const AccountInfo = ({post}) => {
    const [category, setCategory] = useState();
    const [user, setUser] = useState();
    const [follow, setFollow] = useState(false)

    useEffect(() => {
        const uriaccount = `${baseUrl}account/${post.userId}`;

        axios.get(uriaccount, axiosHeaders)
            .then(result => {
                setUser(user => result.data.user);
                setCategory(category => result.data.category);
            })
            .catch(error => {
                console.log("Account could not be fetched from backend.", error);
            });
    }, [])

    if(user !== undefined && category !== undefined) {
        return (
            <div className="user-info">
                <img alt="unavailable" className="col-sm-2" src="/pexels-masha-raymers-2726110.jpg"></img>
                <div className="user-data col-sm-7">
                    <a href={`/account/${post.userId}`}><p className="user-name">{user.firstName}</p></a>
                    
                    <p className="user-username">@{user.username}</p>
                    <p className="post-time">{post.date}</p>
                </div>
                <div onClick={() => setFollow(!follow)} className="btn btn-outline-primary follow-button col-sm-3">
                    {follow ? "  Following" : "  Follow"}
                </div>
            </div>
        )
    } else{
        return (<div></div>)
    }
};

export default AccountInfo;