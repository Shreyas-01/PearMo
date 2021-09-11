const express = require('express');
const Router = express.Router();

const Sponsor = require('../Models/SponsorSchema');

Router.get('/', (req, res, next) => {
    Sponsor.aggregate([
            { 
                $project:{ 
                    _id: 0,
                    userId: 1,
                    sponsorId: 1,
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
            res.status(200).json(
                sponsors
            );
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Unable to fetch sponsors",
                error: error.message
            });
        });
});

module.exports = Router;