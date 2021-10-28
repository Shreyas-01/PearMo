import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../../../../utils/constants';
import './Creators.css'

const RenderCreator = ({creator}) => {
    const [creatorData, setCreatorData] = useState([]);

    useEffect(() => {
        const uriuser = `${baseUrl}user/details/${creator.userId}`;

        axios.get(uriuser, axiosHeaders)
            .then(result => {
                setCreatorData(creatorData => result.data)
                console.log(result.data, creator)
            })
            .catch(error => {
                console.log("Creator data could not be fetched from backend.", error);
            });
    }, [])

    return (
        <div className="container bg-light p-3">
            <div className="row">
                <div className="col-sm-4 d-flex flex-row justify-content-around first">
                    <img className="creator-image" src="https://drive.google.com/uc?export=view&id=1DVhHrkvFLWg88X2HLF7_NdbDzeJs0C3E"></img>
                    <div className="creator-userdata d-flex flex-column">
                        <div className="creator-fullname">
                        <a href={`/account/${creator.userId}`}>{creatorData.fullname}</a>
                        </div>
                        <div className="creates-in">
                            {creator.bio.createIn}
                        </div>
                        <div className="followers">
                            {creator.numberOfFollowing} Followers
                        </div>
                    </div>
                </div> 
                <div className="col-sm-3 creator-bio p-1 second">
                    {creatorData.about}
                </div>
                <div className="col-sm-5">
                    <div className="container d-flex flex-row justify-content-around adding">
                        <button className="adding-button text-light">Add</button>
                        <button className="adding-button text-light">
                            <i className="far fa-envelope"></i> Message
                        </button>
                        <button className="adding-button text-light">
                            <i className="fas fa-handshake"></i> Request Collaboration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RenderCreator;
