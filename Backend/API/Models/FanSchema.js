const mongoose = require('mongoose');

const FollowingSchema = mongoose.Schema({
    category: { type: String, required: true},
    username: { type: String, required: true},
    followerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'catergory', required: true}
});

const FanSchema = mongoose.Schema({
    fanId: { type: mongoose.Schema.Types.ObjectId, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    username: { type: String, required: true},
    image: { type: String, required: false},
    following: [FollowingSchema]
});

module.exports = mongoose.model('Fan', FanSchema);