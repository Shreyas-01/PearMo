const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');
const mongoose = require('mongoose');

Router.get('/trending', (req,res,next) => {
    Post.find().sort([['date', -1]]).limit(20).sort([['likes', 1]])
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
        console.log("Could not fetch trending posts")
        res.status(401).json({
            message: 'Could not fetch trending posts',
            error: error.message
        });
    });
});


Router.get('/recent/:loadmore', (req,res,next) => {

    const nextposts = req.params.loadmore * 1;

    Post.find().sort([['date', -1]]).skip(nextposts).limit(1)
    .then(posts => {
        console.log("Posts fetched successfully")
        res.status(201).json({
            posts
        });
    })
    .catch((error) => {
        console.log("Could not fetch recent posts")
        res.status(401).json({
            message: 'Could not fetch recent posts',
            error: error.message
        });
    });
});
module.exports = Router;