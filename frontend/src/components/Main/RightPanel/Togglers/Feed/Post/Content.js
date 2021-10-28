import './content.css';
import React from 'react';

const Content = ({post}) => {
    const imageUrl = '/pexels-polina-kovaleva-7258389.jpg';
    return (
        <div className="container content m-0 p-0">
            <div className="container description p-2">
                {post.title}
            </div>
            {
                imageUrl !== null ? <img className="col-sm-12" src={imageUrl} />: null
            }
        </div>
    );
};

export default Content;