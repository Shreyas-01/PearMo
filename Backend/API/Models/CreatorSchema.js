const mongoose = require('mongoose');

const FollowingSchema = mongoose.Schema({
    category: { type: String, required: true},
    followerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'category', required: true}
});

const FollowerSchema = mongoose.Schema({
    category: { type: String, required: true},
    followerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'category', required: true}
});

const SocialSchema = mongoose.Schema({
    social: { type: String},
    link: { type: String}
});

const CreatorSchema = mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    image: { type: String, required: false},
    bio: {
        createIn: { type: String, required: true},
        channelURL: { type: String, required: true},
        socials: [SocialSchema]
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    notification: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}],
    following: [FollowingSchema],
    followers: [FollowerSchema]
});

module.exports = mongoose.model('Creator', CreatorSchema);