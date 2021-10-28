const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');

Router.put('/:postID', (req, res, next) => {
    const userId = req.body.userId;
    Post.findOne({ postId: req.params.postID})
        .then(post => {
            post.find({ "post.likes" : userId})
                .then(() => {
                    res.status(201).json({
                        message: result
                        });
                })
            // if(!like) {
            //     Post.updateOne({
            //                 'postId': post.postId
            //             },
            //             { 
            //                 $pull: {
            //                     likes:  { likeId: userId} 
            //                 },
            //                 $inc: { 
            //                     numberOfLikes : -1
            //                 }
            //         })
            //         .then(() => {
            //             res.status(201).json({
            //                 response: 'Post unliked'
            //             });
            //         })
            //         .catch(error => {
            //             res.status(400).json({
            //                 response: 'Unable to unlike',
            //                 error: error.message
            //             });
            //         })
            // } else {
            //     Post.updateOne( 
            //             {
            //                 'postId': post.postId
            //             },
            //             { 
            //                 $push: {
            //                     likes: {likeId: userId} 
            //                 },
            //                 $inc: { 
            //                     numberOfLikes : 1
            //                 }
            //             }
            //         )
            //         .then(() => {
            //             res.status(201).json({
            //                 response: 'Post liked'
            //             });
            //         })
            //         .catch(error => {
            //             res.status(400).json({
            //                 response: 'Unable to like',
            //                 error: error.message
            //             });
            //         });
            // }
        })
        .catch(error => {
            res.status(500).json({
                response: 'Post Not Found',
                error: error.message
            });
        })
});

module.exports = Router;