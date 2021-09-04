const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../Models/UserSchema');
const Fan = require('../Models/FanSchema');
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');

Router.post('/', (req, res, next) => {
    User.find({ email: req.body.email}).exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(402).json({
                    message: 'User exist account is already created'
                });
            } else {
                const newUserId = new mongoose.Types.ObjectId();
                const Salt = 10;

                //CREATOR SIGNUP
                if(req.body.registerAs.category === 'Creator') {
                    const newCreatorId = new mongoose.Types.ObjectId();
                    bcrypt.hash(req.body.password, Salt, (err, hash) => {
                        if(err) {
                            res.status(500).json({ 
                                message: "bcrypt hashing failed",
                                error: err.message
                            })
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
                                    category: req.body.registerAs.category,
                                    categoryId: newCreatorId
                                },
                                password: hash
                            });
                            const newCreator = new Creator({
                                creatorId: newCreatorId,
                                userId: newUserId,
                                
                                image: null,
                                bio: {
                                    createIn: req.body.bio.createIn,
                                    channelURL: req.body.bio.channelURL,
                                    socials: req.body.bio.socials
                                }
                            });

                            newUser.save()
                            .then(userresult => {
                                newCreator.save()
                                    .then(creatorresult => {
                                        res.status(200).json({
                                            userresult,
                                            creatorresult
                                        });
                                    })
                                    .catch(err => {
                                        console.log('Creator creation failed');
                                        res.status(500).json({ error: err.message});
                                    });
                            })
                            .catch(err => {
                                console.log('User creation failed');
                                res.status(500).json({ error: err.message});
                            });
                            
                        }
                    });

                //SPONSOR SIGNUP
                } else if(req.body.registerAs.category === 'Sponsor') {
                    const newSponsorId = new mongoose.Types.ObjectId();
                    bcrypt.hash(req.body.password, Salt, (err, hash) => {
                        if(err) {
                            return res.status(500).json({ error: err})
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
                                    category: req.body.registerAs.category,
                                    categoryId: newSponsorId
                                },
                                password: hash
                            });
                            const newSponsor = new Sponsor({
                                sponsorId: newSponsorId,
                                userId: newUserId,
                                image: null,
                                bio: {
                                    sponsorIn: req.body.bio.sponsorIn,
                                    companyURL: req.body.bio.companyURL,
                                    socials: req.body.bio.socials
                                }
                            });

                            newUser.save()
                            .then(userresult => {
                                newSponsor.save()
                                    .then(sponsorresult => {
                                        res.status(200).json({
                                            userresult,
                                            sponsorresult
                                        });
                                    })
                                    .catch(err => {
                                        console.log('Sponsor creation failed');
                                        res.status(500).json({ error: err.message});
                                    });
                            })
                            .catch(err => {
                                console.log('User creation failed');
                                res.status(500).json({ error: err.message});
                            });
                        }
                    });

                //FAN SIGNUP
                } else {
                    const newFanId = new mongoose.Types.ObjectId();
                    bcrypt.hash(req.body.password, Salt, (err, hash) => {
                        if(err) {
                            return res.status(500).json({ error: err})
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
                                    category: req.body.registerAs.category,
                                    categoryId: newFanId
                                },
                                password: hash
                            });
                            const newFan = new Fan({
                                fanId: newFanId,
                                userId: newUserId,
                                image: null
                            });

                            newUser.save()
                            .then(userresult => {
                                newFan.save()
                                .then(fanresult => {
                                    res.status(200).json({
                                        userresult,
                                        fanresult
                                    });
                                })
                                .catch(err => {
                                    console.log('Fan creation failed');
                                    res.status(500).json({ error: err.message});
                                });
                            })
                            .catch(err => {
                                console.log('User creation failed');
                                res.status(500).json({ error: err.message});
                            });
                        }
                    });

                }
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not signup.',
                error: error.message
            });
        });
});

module.exports = Router;