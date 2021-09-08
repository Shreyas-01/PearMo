const express = require('express');
const Router = express.Router();
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');

Router.get('/creator/:accountid', (req, res ,next) => {
    const creatorid = req.params.accountid;

    Creator.findOne({creatorId: creatorid})
            .then(creator => {
                console.log("Creator fetched successfully")
                res.status(200).json({
                    username: creator.username,
                    image: creator.image,
                    bio: creator.bio,
                    username: creator.username,
                    posts: creator.posts,
                    numberofposts: creator.posts.length,
                    numberoffollowing: creator.following.length,
                    numberoffollowers: creator.followers.length,
                })
            })
            .catch(error => {
                console.log("Failed to fetch creator")
                res.status(401).json({
                    message: 'Failed to fetch creator',
                    error: error.message
                });
            });
});

Router.get('/sponsor/:accountid', (req, res ,next) => {
    const sponsorid = req.params.accountid;

    Sponsor.findOne({sponsorId: sponsorid})
            .then(sponsor => {
                console.log("Creator fetched successfully")
                res.status(200).json({
                    username: sponsor.username,
                    image: sponsor.image,
                    bio: sponsor.bio,
                    username: sponsor.username,
                    posts: sponsor.posts,
                    numberofposts: sponsor.posts.length,
                    numberoffollowing: sponsor.following.length,
                    numberoffollowers: sponsor.followers.length,
                })
            })
            .catch(error => {
                console.log("Failed to fetch sponsor")
                res.status(401).json({
                    message: 'Failed to fetch sponsor',
                    error: error.message
                });
            });
});

module.exports = Router;