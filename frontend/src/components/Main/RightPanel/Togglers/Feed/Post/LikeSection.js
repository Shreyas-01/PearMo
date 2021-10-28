import React from 'react';
import axios from 'axios';
// import { baseUrl, axiosHeaders } from '../../../../../utils/constants';

const LikeSection = ({post}) => {

    const updateLike = (e) => {
        e.classList.toggle("far fa-thumbs-up");
    }
    return (
        <div className="container">
            <i className="fas fa-thumbs-up" onClick={(e) => updateLike(e)}>Like</i>
            <i className="far fa-comment-dots p-2"> Comment</i>
            <i className="fas fa-share p-2"></i> Share
        </div>
    );
};

export default LikeSection;