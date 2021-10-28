import './commentInfo.css';
import React from 'react';
import IndividualComment from './IndividualComment';

const CommentInfo = ({post}) => {
    if(post.comments !== undefined && post.comments.length > 0) {
        return (
            <React.Fragment>
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
                    { post.comments.map(comment => {<IndividualComment comment={comment}/>}) }
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
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
                </React.Fragment>
        )
    }
};

export default CommentInfo;