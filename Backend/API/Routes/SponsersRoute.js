const express = require('express');
const Router = express.Router();

const Creator = require('../Models/CreatorSchema');

// ensure authentication as well
Router.get('/', (req, res, next) => {
    Creator.aggregate([
        { 
            $project:{ 
                _id: 0,
                sponserId: 1,
                username: 1,
                image: 1,
                numberOfFollowers: { 
                    $cond: { 
                        if: { $isArray: "$followers" }, 
                        then: { $size: "$followers" }, 
                        else: 0
                    }
                },
                numberOfFollowing: { 
                    $cond: { 
                        if: { $isArray: "$following" }, 
                        then: { $size: "$following" }, 
                        else: 0
                    }
                }
            }
        }
    ])
    .then(creators => {
        console.log(creators);
        res.status(200).json(creators);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "unable to fetch sponsers",
            error: error.message
        });
    });

});

module.exports = Router;