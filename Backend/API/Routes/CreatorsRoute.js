const express = require('express');
const Router = express.Router();

const Creator = require('../Models/CreatorSchema');

Router.get('/', (req, res, next) => {
    res.status(200).send('Creators fetched.');
});

module.exports = Router;