const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');
const mongoose = require('mongoose')

Router.get('/', (req,res,next) => {
    const filter = req.query.filter;

    if(filter === 'recent'){
        Post.find().sort([['date', 1]]).limit(20)
        .then(posts => {
            console.log("Posts fetched successfully")
            res.status(201).json({
                posts
            });
        })
        .catch((error) => {
            console.log("Could not fetch posts")
            res.status(401).json({
                message: 'Could not fetch posts',
                error: error.message
            });
        });
    }
    else if(filter === 'trending'){
        Post.find().sort([['date', 1]]).limit(20)
        .then(posts => {
            const count = posts.length;
            var random = Math.floor(Math.random() * count)

            try{
                console.log("Post fetched successfully")
                res.status(401).json({
                    post: posts[random]
                });
            }
            catch{error =>{
                console.log("Could not fetch posts")
                res.status(401).json({
                    message: 'Could not fetch posts',
                    error: error.message
                });
            }}
        })
        .catch((error) => {
            console.log("Could not fetch posts")
            res.status(401).json({
                message: 'Could not fetch posts',
                error: error.message
            });
        });
    }
    else{
        res.status(401).json({
            message: 'Invalid post fetching request',
        });
    }
});

module.exports = Router;