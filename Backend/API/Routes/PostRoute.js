const mongoose = require('mongoose');
const express = require('express');
const Router = express.Router();

const Post = require('../Models/PostSchema');
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');

const uploadingToAWS = require('../Middlewares/Upload');

Router.get('/:postID', (req, res, next) => {
    Post.findOne({ postId: req.params.postID})
        .then(post => {
            res.status(201).json({
                response: 'Success',
                post: post
            });
        })
        .catch(error => {
            res.status(404).json({
                response: 'Post Not Found',
                error: error.message
            });
        });
});

Router.post('/', uploadingToAWS, (req, res, next) => {  // middleware as upload.single('image')
    const newPostId = new mongoose.Types.ObjectId();
    
    console.log('Returned from Middleware...');

    const newPost = new Post({
        postId: newPostId,
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        image: req.file.location,  // req.file.location
        userId: req.body.userId
    });

    newPost.save()
        .then(post => {
            console.log('Post Created Successfully: \n' + post);
            if(req.body.category === 'Creator') {
                Creator.findOne({ creatorId: req.body.categoryId})
                    .then(creator => {
                        creator.posts.push(newPostId);
                        creator.save()
                            .then(result => {
                                console.log('Post Creator Result: \n' + result);
                                res.status(201).json({
                                    message: "New Post Created and Added to Account",
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "Unable to add to Creator",
                                    error: err.message
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Unable to find & add to Creator",
                            error: err.message
                        });
                    });
            } else if(req.body.category === 'Sponsor') {
                Sponsor.findOne({ sponsorId: req.body.categoryId})
                    .then(sponsor => {
                        sponsor.posts.push(newPostId);
                        sponsor.save()
                            .then(result => {
                                console.log('Post Sponsor Result: \n' + result);
                                res.status(201).json({
                                    message: "New Post Created and Added to Account",
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "Unable to find & add to Sponsor",
                                    error: err.message
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Unable to add to Sponsor",
                            error: err.message
                        });
                    });
            } else {
                res.status(500).json({
                    response: 'Invalid Category'
                });
            }
        })
        .catch(error => {
            console.log('Post Creation Failed');
            res.status(500).json({ 
                response: 'Post Creation Failed',
                error: error.message
            });
        });

});

module.exports = Router;