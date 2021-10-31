import './individualComment.css';
import React from 'react';
import { Link } from "react-router-dom";

const IndividualComment = ({comment}) => {
    return (
        <div className="ind-comment">
            <Link to="/main/feed" style={{textDecoration: "none"}}>
                <img  alt="unavailable" src="https://drive.google.com/uc?export=view&id=1DVhHrkvFLWg88X2HLF7_NdbDzeJs0C3E" />
            </Link>

            <div className="">
                <p className="individual-comment">
                    <p className="">{comment.userId}</p>
                    <p className="">{comment.date}</p>
                </p>
                <p>{comment.text}</p>
            </div>
        </div>
    );
};

export default IndividualComment;