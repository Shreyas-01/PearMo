import './individualComment.css';
import React from 'react';
import { Link } from "react-router-dom";

const IndividualComment = ({comment}) => {
    console.log("here")
    return (
        <div className="container d-flex flex-row pt-2">
            <Link to="/main/feed" style={{textDecoration: "none"}}>
                <img className="user-image-link" src="/pexels-masha-raymers-2726110.jpg"></img>
            </Link>
            <div className="container m-2" style={{background: "#EAECEE", borderRadius: "12px", maxWidth: "80%"}}>
                <p className="individual-comment m-0 p-0 d-flex justify-content-between">
                    <p className="p-0 m-0">{comment.userId}</p>
                    <p className="p-0 m-0">{comment.date}</p>
                </p>
                <p>
                    {comment.text}
                </p>
            </div>
        </div>
    );
};

export default IndividualComment;