const express = require('express');
const Router = express.Router();
const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

Router.post('/', (req, res ,next) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(user === null){
                res.status(401).json({
                    message: 'Account Does Not Exist',
                });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((result) => {
                        if(result === false){
                            res.status(401).json({
                                message: 'Incorrect Password',
                            });
                        } else {
                            const age = parseInt(process.env.TOKEN_AGE); // 4 hours
                            const email = req.body.email;
                            const token = jwt.sign({
                                                    email
                                                },
                                                process.env.JWTTOKEN, { 
                                                    expiresIn: age
                                            });
                            res.cookie('jwt', token, { 
                                    httpOnly: true, 
                                    maxAge: age 
                                });
                            res.status(200).json({
                                message: 'Login Successful',
                                userId: user.userId,
                                category: user.registerAs.category,
                                categoryId: user.registerAs.categoryId,
                                username: user.username,
                                fullname: user.firstName + user.middleName + user.lastName,
                                email: user.email
                            });  
                        }
                    })
                    .catch(error => {
                        res.status(401).json({
                            message: 'Token Generation Failed',
                            error: error.message
                        });
                    });
            }
        })
        .catch(error => {
            res.status(401).json({
                message: 'Could Not Login',
                error: error.message
            });
        });
});

module.exports = Router;