const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../Models/UserSchema');
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');

Router.post('/', (req, res, next) => {
    User.find({ email: req.body.email}).exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(402).json({
                    message: 'Account Exists'
                });
            } else {
                const newUserId = new mongoose.Types.ObjectId();
                const Salt = parseInt(process.env.SALT);    // need to make environment variable

                //CREATOR SIGNUP
                if(req.body.category === 'Creator') {
                    const newCreatorId = new mongoose.Types.ObjectId();
                    bcrypt.hash(req.body.password, Salt, (err, hash) => {
                        if(err) {
                            res.status(500).json({ 
                                message: "Hashing Failed",
                                error: err.message
                            });
                        } else {
                            const newUser = new User({
                                userId: newUserId,
                                firstName: req.body.firstName,
                                middleName: req.body.middleName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                username: req.body.username,
                                dob: req.body.dob,
                                registerAs: { 
                                    category: req.body.category,
                                    categoryId: newCreatorId
                                },
                                password: hash
                            });
                            const newCreator = new Creator({
                                creatorId: newCreatorId,
                                userId: newUserId,
                                bio: {
                                    createIn: req.body.createIn,
                                    channelURL: req.body.channelURL,
                                },
                                socials: req.body.socials
                            });

                            newUser.save()
                                .then(user => {
                                    newCreator.save()
                                        .then(creator => {
                                            console.log('Creator: ' + creator + '\n' + 'User: ' + user);
                                            res.status(200).json({
                                                userId: user.userId,
                                                category: user.registerAs.category,
                                                categoryId: user.registerAs.categoryId,
                                                username: user.username,
                                                fullname: user.firstName + user.middleName + user.lastName,
                                                email: user.email
                                            });
                                        })
                                        .catch(err => {
                                            res.status(500).json({ 
                                                response: 'Creator Creation Failed!',
                                                error: err.message
                                            });
                                        });
                                })
                                .catch(err => {
                                    res.status(500).json({ 
                                        response: "User Creation Failed!",
                                        error: err.message
                                    });
                                });
                            
                        }
                    });

                //SPONSOR SIGNUP
                } else if(req.body.category === 'Sponsor') {
                    const newSponsorId = new mongoose.Types.ObjectId();
                    bcrypt.hash(req.body.password, Salt, (err, hash) => {
                        if(err) {
                            res.status(500).json({ 
                                message: "Hashing Failed",
                                error: err.message
                            });
                        } else {
                            const newUser = new User({
                                userId: newUserId,
                                firstName: req.body.firstName,
                                middleName: req.body.middleName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                username: req.body.username,
                                dob: req.body.dob,
                                registerAs: { 
                                    category: req.body.category,
                                    categoryId: newCreatorId
                                },
                                password: hash
                            });
                            const newSponsor = new Sponsor({
                                sponsorId: newSponsorId,
                                userId: newUserId,
                                bio: {
                                    sponsorIn: req.body.sponsorIn,
                                    companyURL: req.body.companyURL,
                                },
                                socials: req.body.socials
                            });

                            newUser.save()
                            .then(user => {
                                newSponsor.save()
                                    .then(sponsor => {
                                        console.log('Sponsor: ' + sponsor + '\n' + 'User: ' + user);
                                        res.status(200).json({
                                            userId: user.userId,
                                            category: user.registerAs.category,
                                            categoryId: user.registerAs.categoryId,
                                            username: user.username,
                                            fullname: user.firstName + user.middleName + user.lastName,
                                            email: user.email
                                        });
                                    })
                                    .catch(err => {
                                        res.status(500).json({ 
                                            response: 'Sponsor Creation Failed!',
                                            error: err.message
                                        });
                                    });
                            })
                            .catch(err => {
                                res.status(500).json({ 
                                    response: "User Creation Failed!",
                                    error: err.message
                                });
                            });
                        }
                    });

                //FAN SIGNUP
                } else {
                    res.status(500).json({
                        response: 'Invalid Category'
                    });
                }
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could Not Signup',
                error: error.message
            });
        });
});

module.exports = Router;