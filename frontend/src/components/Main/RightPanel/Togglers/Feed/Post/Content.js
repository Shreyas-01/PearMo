import './content.css';
import React from 'react';

const Content = ({post}) => {
    return (
        <div className="container content m-0 p-0">
            <div className="container description p-2">
                {post.description}
            </div>
        </div>
    );
};

export default Content;