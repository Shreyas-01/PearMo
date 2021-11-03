import React from 'react';
import axios from 'axios';
import './LikeSection.css'
// import { baseUrl, axiosHeaders } from '../../../../../utils/constants';

const LikeSection = ({post}) => {

    const updateLike = (e) => {
        e.classList.toggle("far fa-thumbs-up");
    }
    return (
        <div className="container like-section">
            <i className="far fa-thumbs-up" onClick={(e) => updateLike(e)}><span> Like</span></i>
            <i className="far fa-share-square"><span> Share</span></i>
        </div>
    );
};

export default LikeSection;