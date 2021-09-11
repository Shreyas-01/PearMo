const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    likeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
});

const CommentSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: { type: String},
    date: { type: Date, default: Date.now}
});

const PostSchema = mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true},
    date: { type: Date, default: Date.now},
    title: { type: String, required: true},
    description: { type: String, required: false},
    text: { type: String, required: true},
    image: { type: String, required: false},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likes: [LikeSchema],
    numberOfLikes: { type: Number, default: 0},
    comments: [CommentSchema],
    share: { type: String}
});

module.exports = mongoose.model('Post', PostSchema);