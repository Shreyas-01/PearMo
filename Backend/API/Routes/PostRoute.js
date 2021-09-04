const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');
const mongoose = require('mongoose');

Router.post('/', (req, res, next) => {
    const newPostId = new mongoose.Types.ObjectId();

    const newPost = new Post({
        postId: newPostId,
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        image: req.body.image,
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
            res.status(200).json({
                postresult
            });
        })
        .catch(err => {
            console.log('Post creation failed');
            res.status(500).json({ error: err.message});
        });
});

module.exports = Router;