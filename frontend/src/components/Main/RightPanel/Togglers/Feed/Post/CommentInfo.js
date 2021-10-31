import './commentInfo.css';
import React from 'react';
import IndividualComment from './IndividualComment';

const CommentInfo = ({post}) => {
    if(post.comments !== undefined && post.comments.length > 0) {
        return (
            <>
                <div className="comment-info row container">
                    <div className="col-1">
                        <img  alt="unavailable" src="https://drive.google.com/uc?export=view&id=1DVhHrkvFLWg88X2HLF7_NdbDzeJs0C3E" />
                    </div>

                    <div className="col-10">
                        <input type="text" name="comment" className="new-comment" placeholder="Add a comment..." />
                    </div>
                    
                    <div className="col-1">
                        <i className="far fa-paper-plane"></i>
                    </div>
                </div>

                <div className="container">
                    { post.comments.map(comment => {<IndividualComment comment={comment}/>}) }
                </div>
            </>
        );


    } else {
        return (
            <>
                <div className="container d-flex flex-row comment-info">
                    <div>
                        <img className="m-1" src="/pexels-masha-raymers-2726110.jpg" />
                    </div>

                    <div className="container d-flex justify-content-between col-sm-8 m-0 p-0">
                        <input type="text" name="comment" className="comment-input"/>
                        <button className="comment-send">
                            <i className="far fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                
                <div className="container">
                    
                </div>
            </>
        )
    }
};

export default CommentInfo;