const express = require('express');
const Router = express.Router();
const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

Router.post('/', (req, res ,next) => {

    User.findOne({email: req.body.email})
        .then(userexists => {
            if(userexists === null){
                console.log('No user with this email exists');
                res.status(401).json({
                    message: 'No user with this email exists',
                });
            } else {
                bcrypt.compare(req.body.password, userexists.password)
                    .then((result) => {
                        if(result === false){
                            console.log("Entered password is incorrect.");
                            res.status(401).json({
                                message: 'Entered password is incorrect.',
                            });
                        } else {
                            const age = 1000 * 60 * 60 * 4; // 4 hours
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
                            console.log("Login successful.");
                            res.status(200).json({
                                message: 'Login successful',
                                userId:userexists.userId,
                                category: userexists.registerAs.category,
                                categoryId: userexists.registerAs.categoryId,
                                username: userexists.username
                            });  
                        }
                    })
                    .catch(error => {
                        console.log("tokene generation failed")
                        res.status(401).json({
                            message: 'token generation failed',
                            error: error.message
                        });
                    });
            }
        })
        .catch(error => {
            console.log("Could not login.")
            res.status(401).json({
                message: 'Could not login.',
                error: error.message
            });
        });
});

module.exports = Router;