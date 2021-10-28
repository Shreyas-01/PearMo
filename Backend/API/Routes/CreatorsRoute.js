const express = require('express');
const Router = express.Router();

const Creator = require('../Models/CreatorSchema');

Router.get('/', (req, res, next) => {
    Creator.aggregate([
            { 
                $project:{ 
                    _id: 0,
                    userId: 1,
                    creatorId: 1,
                    bio: 1,
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
            res.status(200).json({
                creators
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Unable to fetch creators",
                error: error.message
            });
        });
});

module.exports = Router;