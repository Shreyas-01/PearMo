  
const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');

const uploadingToAWS = require('../Middlewares/Upload');
const User = require('../Models/UserSchema');

Router.get('/:userID', (req, res, next) => {
    const userId = req.params.userID;
    User.findOne({ userId: userId})
        .then(user => {
            res.status(200).json({
                accountDetails: user
            });
        })
        .catch(error => {
            res.status(500).json({
                response: "User not found",
                error: error.message
            });
        });
});

Router.patch('/:userID', uploadingToAWS, (req, res, next) => {
    
    const userId = req.params.userID;
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
                image: (typeof req.file === 'undefined') ? process.env.DEFAULT_AVATAR : req.file.location,
                password: hash
            }, {
                new: true
            })
            .then(user => {
                res.status(201).json({
                    response: 'User Detials Updated',
                    user: user
                });
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