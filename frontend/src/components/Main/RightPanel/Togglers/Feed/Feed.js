import './Feed.css';
import React,{ useContext } from 'react';
import NewPost from './NewPost';
import Posts from './Posts';
import { UserDataContext } from '../../../../../App';

const Feed = () => {
    const {userData, setUserData} = useContext(UserDataContext);

    if(userData === undefined)
    {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className="feed">
            <p>Feed</p>
            <NewPost />
            <Posts />
            </div>
        )
    }
}

export default Feed;