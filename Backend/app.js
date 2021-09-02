const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// .env file configure
const dotenv = require('dotenv');
dotenv.config();

// Import Routes
const defaultRoute = require('./API/Routes/DefaultRoute');
const signUpRoute = require('./API/Routes/SignUpRoute');
const loginRoute = require('./API/Routes/LoginRoute');
const creatorRoute = require('./API/Routes/CreatorsRoute');
const sponserRoute = require('./API/Routes/SponsersRoute');

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@cluster0.tpxdq.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log(`Mongoose Connection Failed!`);
    console.log(err.message);
});

// Morgan for consoling the requests in development mode 
app.use(morgan('dev'));

// Express body parsing for json data and url encoded data
app.use(express.urlencoded({
    extended: false, 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true
}));
app.use(express.json());

// CORS allow
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.DOMAIN_ORIGIN);
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
    next();
});

// Routes for request handling
app.use('/', defaultRoute);
app.use('/signup', signUpRoute);
app.use('/login',loginRoute);
app.use('/creator', creatorRoute);
app.use('/sponser', sponserRoute);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Request Not Found!');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;