const express = require('express');
const Router = express.Router();

Router.get('/', (req, res, next) => {
    res.status(200).send('Default Route working...');
});

Router.post('/', (req, res, next) => {
    const obj = {
        name: req.body.name,
        value: req.params.val,
        id: req.body.id
    };
    res.status(200).json({
        messsage: "Object Created and Express Body parser working correctly.",
        objectCreated: obj
    });
})

module.exports = Router;