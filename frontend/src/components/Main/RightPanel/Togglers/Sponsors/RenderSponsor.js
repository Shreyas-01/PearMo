import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, axiosHeaders } from '../../../../../utils/constants';
import './Sponsors.css';

const RenderSponsor = ({sponsor}) => {
    const [sponsorData, setSponsorData] = useState([]);

    useEffect(() => {
        const uriuser = `${baseUrl}user/details/${sponsor.userId}`;

        axios.get(uriuser, axiosHeaders)
            .then(result => {
                setSponsorData(sponsorData => result.data)
            })
            .catch(error => {
                console.log("Sponsors data could not be fetched from backend.", error);
            });
    }, [])

    return (
        <div className="container bg-light p-3">
            <div className="row">
                <div className="col-sm-4 d-flex flex-row justify-content-around first">
                    <img className="sponsor-image" src="https://drive.google.com/uc?export=view&id=1DVhHrkvFLWg88X2HLF7_NdbDzeJs0C3E"></img>
                    <div className="sponsor-userdata d-flex flex-column">
                        <div className="sponsor-fullname" >
                            <a href={`/account/${sponsor.userId}`}>{sponsorData.fullname}</a>
                        </div>
                        <div className="creates-in">
                            {sponsor.bio.createIn}
                        </div>
                        <div className="followers">
                            {sponsor.numberOfFollowing} Followers
                        </div>
                    </div>
                </div> 
                <div className="col-sm-3 creator-bio p-1 second">
                    {sponsorData.about}
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

export default RenderSponsor;
