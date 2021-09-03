const jwt = require('jsonwebtoken');
const User = require('../Models/UserSchema');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
// check json web token exists and is verified
    if (token) {
        jwt.verify(token, process.env.JWTTOKEN, (error, decodedToken) => {
            if(error){
                console.log("Authentication failed")
                res.status(401).json({
                    message: 'Authentication failed',
                    error: error.message
                });
            } 
            else{
            console.log(decodedToken);
            next();
            }
        });
    }
    else{
        console.log("Authentication failed")
        res.status(401).json({
            message: 'Authentication failed'
        });
    }
};

module.exports = requireAuth;