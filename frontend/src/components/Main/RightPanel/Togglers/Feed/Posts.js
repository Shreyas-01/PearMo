import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Posts.css'
import RenderPost from './Post/IndividualPost';
import { baseUrl, axiosHeaders } from '../../../../../utils/constants';

const Posts = () => {
    const [trendingPost, setTrendingPost] = useState({});
    const [recentPost, setRecentPost] = useState([]);
    const [loadMore, setLoadMore] = useState(0);

    useEffect(() => {
        const uriTrending = `${baseUrl}feed/trending`;

        axios.get(uriTrending, axiosHeaders)
        .then((result) => {
            console.log("Trending Post fetched from backend successfully.");
            setTrendingPost(trendingPost => result.data.post);
        })
        .catch(error => {
            console.log("Trending Post could not be fetched from backend.", error);
        });
    }, [])
    

    useEffect(() => {
        const uriRecent = `${baseUrl}feed/recent/${loadMore}`;

        axios.get(uriRecent, axiosHeaders)
            .then((result) => {
                console.log("Recent posts fetched from backend successfully.");
                setRecentPost([...recentPost, ...result.data.posts]);
                console.log([...result.data.posts])
            })
            .catch(error => {
                console.log("Recent posts could not be fetched from backend.", error);
            })
        }, [loadMore]);
    const updateLoadMore = () => {setLoadMore(loadMore => loadMore+1)};


    const toggletrending = (e) => {
        var x = document.getElementById("trendingpost-cont");

        if(e.target.className === "fas fa-arrow-down fa-sm") {
            e.target.className = "fas fa-arrow-right fa-sm";
            x.style.display = "none";
        }
        else {
            e.target.className = "fas fa-arrow-down fa-sm";
            x.style.display = "block";
        }
    };

    const togglerecent = (e) => {
        var x = document.getElementById("recentposts-cont");

        if(e.target.className === "fas fa-arrow-down fa-sm") {
            e.target.className = "fas fa-arrow-right fa-sm";
            x.style.display = "none";
        }
        else {
            e.target.className = "fas fa-arrow-down fa-sm";
            x.style.display = "block";
        }
    };

    if(trendingPost !== undefined && recentPost !== undefined) {
        return (
            <div className="post">
                <div className="trendingpost">
                    <div className="trendingpost-title row">
                        <hr className="col-5"/>
                        <p className="col-2"> <span>SORT BY:</span> TRENDING <i class="fas fa-arrow-down fa-sm" onClick={(e) => toggletrending(e)}></i></p>
                        <hr className="col-5"/>
                    </div>

                    <div id="trendingpost-cont">
                        <RenderPost post={trendingPost} key={trendingPost._id}/>
                    </div>
                </div>

                <div id="recentposts">
                    <div className="recentposts-title row">
                        <hr className="col-5"/>
                        <p className="col-2"> <span>SORT BY:</span> RECENT <i class="fas fa-arrow-down fa-sm" onClick={(e) => togglerecent(e)}></i></p>
                        <hr className="col-5"/>
                    </div>

                    <div id="recentposts-cont">
                        {recentPost.map((post) => <RenderPost post={post} key={post._id}/>)}
                    </div>
                </div>

                <div className="loadmore">
                    <button className="loadmore-btn" type="button" onClick={updateLoadMore}>Load More Posts</button>
                </div>
            </div>
        )
    } else {
        <div></div>
    }
};

export default Posts;