const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');

Router.get('/trending', (req,res,next) => {
    Post.find()
        .sort([['date', -1]])
        .sort([['numberOfLikes', -1]])
        .limit(10)
        .then(posts => {
            const count = posts.length;
            let random = Math.floor(Math.random() * count)

            try{
                console.log("Post fetched successfully");
                res.status(401).json({
                    post: posts[random]
                });
            } catch (error) { 
                console.log("Could not fetch posts");
                res.status(401).json({
                    message: 'Could not fetch posts',
                    error: error.message
                });
            }
        })
        .catch((error) => {
            console.log("Could not fetch trending posts");
            res.status(401).json({
                message: 'Could not fetch trending posts',
                error: error.message
            });
        });
});

Router.get('/recent/:loadmore', (req,res,next) => {

    const nextposts = (req.params.loadmore)*(process.env.POST_LOAD_NEXT);
    
    Post.find()
        .sort([['date', -1]])
        .skip(nextposts)
        .limit(process.env.POST_LIMIT)
        .then(posts => {
            console.log("Posts fetched successfully")
            res.status(201).json({
                posts
            });
        })
        .catch((error) => {
            console.log("Could not fetch recent posts");
            res.status(401).json({
                message: 'Could not fetch recent posts',
                error: error.message
            });
        });
});

module.exports = Router;