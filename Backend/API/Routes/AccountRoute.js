const express = require('express');
const Router = express.Router();
const User = require('../Models/UserSchema');
const Creator = require('../Models/CreatorSchema');
const Sponsor = require('../Models/SponsorSchema');

Router.get('/:accountId', (req, res ,next) => {
    const userId = req.params.accountId;
    User.findOne({ userId: userId})
        .select(
            'firstName middleName lastName email dob username image joinDate registerAs'
        )
        .then(user => {
            if(user.registerAs.category === 'Creator') {
                Creator.findOne({ creatorId: user.registerAs.categoryId})
                    .select(
                        'creatorId bio socials posts following followers'
                    )
                    .then(creator => {
                        res.status(201).json({
                            response: 'Done',
                            user: user,
                            category: creator
                        });
                    })
                    .catch(error => {
                        res.status(400).json({
                            response: 'Failed to fetch',
                            error: error.message
                        });
                    })
            } else if (user.registerAs.category === 'Sponsor') {
                Sponsor.findOne({ sponsorId: user.registerAs.categoryId})
                    .select(
                        'sponsorId bio socials posts following followers'
                    )
                    .then(sponsor => {
                        res.status(201).json({
                            response: 'Done',
                            user: user,
                            category: sponsor
                        });
                    })
                    .catch(error => {
                        res.status(400).json({
                            response: 'Failed to fetch',
                            error: error.message
                        });
                    })
            } else {
                res.status(500).json({
                    response: 'Invalid User Type'
                });
            }
        })
        .catch(error => {
            res.status(400).json({
                response: 'Account Not Found',
                error: error.message
            });
        });
});

module.exports = Router;