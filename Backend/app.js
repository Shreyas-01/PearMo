const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// .env file configure
const dotenv = require('dotenv');
dotenv.config();

// Import Routes
const signUpRoute = require('./API/Routes/SignUpRoute');
const loginRoute = require('./API/Routes/LoginRoute');
const creatorRoute = require('./API/Routes/CreatorsRoute');
const sponsorRoute = require('./API/Routes/SponsorsRoute');
const feedRoute = require('./API/Routes/FeedRoute');
const postRoute = require('./API/Routes/PostRoute');
const profileRoute = require('./API/Routes/ProfileRoute');
const accountRoute = require('./API/Routes/AccountRoute');
const commentRoute = require('./API/Routes/CommentRoute');
const likeRoute = require('./API/Routes/LikeRoute');
const userRoute = require('./API/Routes/UserRoute');

// Middleware Import
const requireAuth = require('./API/Middlewares/AuthenticationMiddleware');

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
app.use(cookieParser());

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
app.use('/login', loginRoute);
app.use('/signup', signUpRoute);
app.use('/feed', requireAuth, feedRoute);
app.use('/post', requireAuth, postRoute);
app.use('/creator', requireAuth, creatorRoute);
app.use('/sponsor', requireAuth, sponsorRoute);
app.use('/profile', requireAuth, profileRoute);
app.use('/account', requireAuth, accountRoute);
app.use('/user', requireAuth, userRoute);
app.use('/like', requireAuth, likeRoute);
app.use('/comment', requireAuth, commentRoute);

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