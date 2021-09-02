const express = require('express');
const Router = express.Router();
const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

Router.post('/', (req, res ,next) => {
    const {email, password} = req.body;

    User.findOne({email})
    .then(userexists => {
        if(userexists === null){
            console.log('No user with this email exists');
            res.status(401).json({
                message: 'No user with this email exists',
            });
        }
        else{
            bcrypt.compare(password, userexists.password)
            .then((result) => {
                if(result === false){
                    console.log("Entered password is incorrect.")
                    res.status(401).json({
                        message: 'Entered password is incorrect.',
                    });
                }
                else{
                    const jwttoken= 'fwpgmcgsit';
                    const age = 1000 * 60 * 60 * 4; // 4 hours
                    const token = jwt.sign({email}, jwttoken, { expiresIn: age });
                    res.cookie('jwt', token, { httpOnly: true, maxAge: age });
                    console.log("Login successful.")
                    res.status(200).json();
                }
            })
            .catch(error => {
                console.log("Could not login.")
                res.status(401).json({
                    message: 'Could not login.',
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