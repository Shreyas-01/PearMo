import React from 'react';
import AccountInfo from './AccountInfo';
import CommentInfo from './CommentInfo';
import Content from './Content';
import './IndividualPost.css'
import LikeSection from './LikeSection';

const IndividualPost = ({post}) => {
    return (
        <div className="feed-post">
            <AccountInfo post={post}/>
            <Content post={post} />
            <LikeSection />
            <CommentInfo post={post} />
        </div>
    );
};

export default IndividualPost;