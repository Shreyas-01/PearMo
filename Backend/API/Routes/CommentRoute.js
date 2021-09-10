const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');

Router.post('/', (req, res, next) => {
    const postid = req.body.postid;
    const username = req.body.username;
    const text = req.body.text;

    Post.updateOne( 
        {
            'postId': postid
        },
        { 
            $push:{ 
                comments: { text: text, senderName: username }
            } 
        }
    )
    .then(() => {
        res.status(200).json({
            message: 'comment added successfully'
        });
    })
    .catch(error => {
        res.status(400).json({
            message: "could not update post",
            error: error.message
        })
    });
});

module.exports = Router;