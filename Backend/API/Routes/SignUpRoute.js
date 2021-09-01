const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../Models/UserSchema');
const Fan = require('../Models/FanSchema');
const Creator = require('../Models/CreatorSchema');
const Sponser = require('../Models/SponserSchema');

Router.post('/', (req, res, next) => {
    let createdUser;
    let createdCategory;
    User.find({ email: req.body.email}).exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(402).json({
                    message: 'User exist account is already created'
                });
            } else {
                const newUserId = new mongoose.Types.ObjectId();
                const Salt = 10;
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
                                dob: req.body.dob,
                                registerAs: { 
                                    category: req.body.registerAs.category,
                                    categoryId: newCreatorId
                                },
                                password: hash
                            });
                            newUser.save()
                                .then(result => {
                                    // console.log('User Created!');
                                    // res.status(201).json({response: result});
                                    createdUser = result;
                                    // console.log(createdUser);
                                })
                                .catch(err => {
                                    console.log('User creation failed');
                                    res.status(500).json({ error: err.message});
                                });
                            const newCreator = new Creator({
                                creatorId: newCreatorId,
                                userId: newUserId,
                                username: req.body.username,
                                image: null,
                                bio: {
                                    createIn: req.body.bio.createIn,
                                    channelURL: req.body.bio.channelURL,
                                    socials: req.body.bio.socials
                                }
                            });
                            newCreator.save()
                                .then(result => {
                                    // console.log('Creator Created!');
                                    // res.status(201).json({response: result});
                                    createdCategory = result;
                                    res.status(200).json({
                                        createdUser,
                                        createdCategory
                                    });
                                })
                                .catch(err => {
                                    console.log('Creator creation failed');
                                    res.status(500).json({ error: err.message});
                                });
                        }
                    });

                } else if(req.body.registerAs.category === 'Sponser') {
                    const newSponserId = new mongoose.Types.ObjectId();
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
                                dob: req.body.dob,
                                registerAs: { 
                                    category: req.body.registerAs.category,
                                    categoryId: newSponserId
                                },
                                password: hash
                            });
                            newUser.save()
                                .then(result => {
                                    // console.log('User Created!');
                                    // res.status(201).json({response: result});
                                    createdUser = result;
                                })
                                .catch(err => {
                                    console.log('User creation failed');
                                    res.status(500).json({ error: err.message});
                                });

                            const newSponser = new Sponser({
                                sponserId: newSponserId,
                                userId: newUserId,
                                username: req.body.username,
                                image: null,
                                bio: {
                                    createIn: req.body.bio.createIn,
                                    channelURL: req.body.bio.channelURL,
                                    socials: req.body.bio.socials
                                }
                            });
                            newSponser.save()
                                .then(result => {
                                    // console.log('Sponser Created!');
                                    // res.status(201).json({response: result});
                                    createdCategory = result;
                                    res.status(200).json({
                                        createdUser,
                                        createdCategory
                                    });
                                })
                                .catch(err => {
                                    console.log('Sponser creation failed');
                                    res.status(500).json({ error: err.message});
                                });
                            
                        }
                    });

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
                                dob: req.body.dob,
                                registerAs: { 
                                    category: req.body.registerAs.category,
                                    categoryId: newFanId
                                },
                                password: hashpwd
                            });
                            newUser.save()
                                .then(result => {
                                    // console.log('User Created!');
                                    // res.status(201).json({response: result});
                                    createdUser = result;
                                })
                                .catch(err => {
                                    console.log('User creation failed');
                                    res.status(500).json({ error: err.message});
                                });

                            const newFan = new Fan({
                                fanId: newFanId,
                                userId: newUserId,
                                username: req.body.username,
                                image: null
                            });
                            newFan.save()
                                .then(result => {
                                    // console.log('Fan Created!');
                                    // res.status(201).json({response: result});
                                    createdCategory = result;
                                    res.status(200).json({
                                        createdUser,
                                        createdCategory
                                    });
                                })
                                .catch(err => {
                                    console.log('Fan creation failed');
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