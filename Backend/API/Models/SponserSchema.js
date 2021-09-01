const mongoose = require('mongoose');

const FollowingSchema = mongoose.Schema({
    category: { type: String, required: true},
    followerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'catergory', required: true}
});

const FollowerSchema = mongoose.Schema({
    category: { type: String, required: true},
    followerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'catergory', required: true}
});

const SocialSchema = mongoose.Schema({
    social: { type: String},
    link: { type: String}
});

const SponserSchema = mongoose.Schema({
    sponserId: { type: mongoose.Schema.Types.ObjectId, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    username: { type: String, required: true},
    image: { type: String, required: false},
    bio: {
        sponserIn: { type: String, required: true},
        companyURL: { type: String, required: true},
        socials: [SocialSchema]
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    notification: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}],
    following: [FollowingSchema],
    followers: [FollowerSchema]
});

module.exports = mongoose.model('Sponser', SponserSchema);