const express = require('express');
const Router = express.Router();

const Sponsor = require('../Models/SponsorSchema');

// ensure authentication as well
Router.get('/', (req, res, next) => {
    Sponsor.aggregate([
        { 
            $project:{ 
                _id: 0,
                sponsorId: 1,
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
    .then(sponsors => {
        console.log(sponsors);
        res.status(200).json(sponsors);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "unable to fetch sponsors",
            error: error.message
        });
    });

});

module.exports = Router;