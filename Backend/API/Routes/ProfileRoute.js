const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');

const uploadingToAWS = require('../Middlewares/Upload');
const User = require('../Models/UserSchema');
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');

Router.get('/:accountId', (req, res, next) => {
    const userId = req.params.accountId;
    User.findOne({ userId: userId})
        .then(user => {
            res.status(200).json({
                accountDetails: user
            });
        })
        .catch(err => {
            res.status(500).json({
                response: "User not found",
                message: err.message
            });
        });
});

Router.patch('/:accountId', uploadingToAWS, (req, res, next) => {
    // userId, firstname, lastname, username, image, about, password, email
    
    const userId = req.params.accountId;
    const Salt = 10;
    
    bcrypt.hash(req.body.password, Salt, (err, hash) => {
        if(err) {
            res.status(500).json({ 
                message: "bcrypt hashing failed",
                error: err.message
            })
        }
        User.findOneAndUpdate({ userId: userId}, {
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                image: req.file.location,
                password: hash
            }, {
                new: true
            })
            .then(user => {
                
                // user.registerAs.category
                if(user.registerAs.category === 'Creator') {
                    Creator.findOneAndUpdate({ creatorId: user.registerAs.categoryId}, {
                            username: user.username,
                            image: user.image
                        }, {
                            new: true
                        })
                        .then(creator => {
                            res.status(200).json({
                                response: "update successfull",
                                creator: creator,
                                user: user
                            });
                        }) 
                        .catch(err => {
                            res.status(500).json({
                                response: "Unable to update creator",
                                error: err.message
                            });
                        });
                } else if (user.registerAs.category === 'Sponsor') {
                    Sponsor.findOneAndUpdate({ sponsorId: user.registerAs.categoryId}, {
                            username: user.username,
                            image: user.image
                        }, {
                            new: true
                        })
                        .then(sponsor => {
                            res.status(200).json({
                                response: "update successfull",
                                sponsor: sponsor,
                                user: user
                            });
                        }) 
                        .catch(err => {
                            res.status(500).json({
                                response: "Unable to update sponsor",
                                error: err.message
                            });
                        });
                }
            })
            .catch(err => {
                res.status(500).json({
                    response: "Unable to update",
                    message: err.message
                });
            });
    });
});

module.exports = Router;