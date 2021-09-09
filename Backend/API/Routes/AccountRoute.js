const express = require('express');
const Router = express.Router();
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');
const Post = require('../Models/PostSchema');

Router.get('/', (req, res ,next) => {
    const categoryid = req.query.categoryid;
    const category = req.query.category;

    if(category === 'Creator'){
        Creator.findOne({creatorId: categoryid})
        .then(creator => {
            Post.find({'postId': { $in: creator.posts }})
                .then(posts => {
                    console.log("Creator fetched successfully")
                    console.log(posts);
                    res.status(200).json({
                        username: creator.username,
                        image: creator.image,
                        bio: creator.bio,
                        posts: posts,
                        numberofposts: creator.posts.length,
                        numberoffollowing: creator.following.length,
                        numberoffollowers: creator.followers.length,
                    })
                })
                .catch(error => {
                    console.log("Failed to fetch creators posts")
                    res.status(401).json({
                        message: 'Failed to fetch creators posts',
                        error: error.message
                    });
                })
        })
        .catch(error => {
            console.log("Failed to fetch creator")
            res.status(401).json({
                message: 'Failed to fetch creator',
                error: error.message
            });
        });
    } else {
        Sponsor.findOne({sponsorId: categoryid})
        .then(sponsor => {
            Post.find({'postId': { $in: sponsor.posts }})
                .then(posts => {
                    console.log("Sponsor fetched successfully")
                    console.log(posts);
                    res.status(200).json({
                        username: sponsor.username,
                        image: sponsor.image,
                        bio: sponsor.bio,
                        posts: posts,
                        numberofposts: sponsor.posts.length,
                        numberoffollowing: sponsor.following.length,
                        numberoffollowers: sponsor.followers.length,
                    })
                })
                .catch(error => {
                    console.log("Failed to fetch sponsor posts")
                    res.status(401).json({
                        message: 'Failed to fetch sponsor posts',
                        error: error.message
                    });
                })
        })
        .catch(error => {
            console.log("Failed to fetch sponsor")
            res.status(401).json({
                message: 'Failed to fetch sponsor',
                error: error.message
            });
        });
    }
});

module.exports = Router;