const mongoose = require('mongoose');
const express = require('express');
const Router = express.Router();

const upload = require('../Middlewares/Upload');
const Post = require('../Models/PostSchema');
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');

Router.post('/', (req, res, next) => {  // middleware as upload.single('image')
    const newPostId = new mongoose.Types.ObjectId();

    const newPost = new Post({
        postId: newPostId,
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        image: req.body.image,  // req.file.location
        accountData: {
            accountCategory: req.body.accountData.accountCategory,
            accountImage: req.body.accountData.accountImage,
            accountId: req.body.accountData.accountId,
            accountName: req.body.accountData.accountName
        }
    });

    newPost.save()
        .then(postresult => {
            console.log('post created successfully');
            if(req.body.accountData.accountCategory === 'Creator') {
                Creator.findOne({ creatorId: req.body.accountData.accountId})
                    .then(creator => {
                        creator.posts.push(newPostId);
                        creator.save()
                            .then(result => {
                                res.status(201).json({
                                    message: "New Post Created and Added to Account",
                                    result
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
            } else if(req.body.accountData.accountCategory === 'Sponsor') {
                Sponsor.findOne({ sponsorId: req.body.accountData.accountId})
                    .then(sponsor => {
                        sponsor.posts.push(newPostId);
                        sponsor.save()
                            .then(result => {
                                res.status(201).json({
                                    message: "New Post Created and Added to Account",
                                    result
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
            }
        })
        .catch(err => {
            console.log('Post creation failed');
            res.status(500).json({ error: err.message});
        });

});

module.exports = Router;