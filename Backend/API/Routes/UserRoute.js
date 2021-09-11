const express = require('express');
const Router = express.Router();

const User = require('../Models/UserSchema');

Router.get('/details/:userID', (req, res, next) => {
    const userID = req.params.userID;
    User.findOne({ userId: userID})
        .then(user => {
            res.status(200).json({
                message: 'User Details',
                userId: user.userId,
                category: user.registerAs.category,
                categoryId: user.registerAs.categoryId,
                username: user.username,
                fullname: user.firstName + user.middleName + user.lastName,
                image: user.image
            });  
        })
        .catch(err => {
            res.status(400).json({
                response: 'User Details Found',
                error: err.message
            });
        });
});

module.exports = Router;