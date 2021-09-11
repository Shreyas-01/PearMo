const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');

Router.post('/:postId', (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
    const text = req.body.text;

    Post.updateOne({
                'postId': postId
            },
            { 
                $push:{ 
                    comments: { text: text, userId: userId }
                }
        })
        .then(() => {
            res.status(200).json({
                message: 'Comment Added Successfully'
            });
        })
        .catch(error => {
            res.status(400).json({
                message: "Could Not Add Comment",
                error: error.message
            })
        });
});

module.exports = Router;