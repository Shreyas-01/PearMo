const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    UserCategory: { type: String},
    LikeId: { type: mongoose.Schema.Types.ObjectId, refPath: 'UserCategory'} 
});

const CommentSchema = mongoose.Schema({
    senderName: { type: String, required: true},
    text: { type: String},
    date: { type: Date, default: Date.now}
});

const PostSchema = mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true},
    date: { type: Date, default: Date.now},
    title: { type: String, required: true},
    description: { type: String, required: false},
    text: {type:String, required: true},
    image: { type: String, required: false},
    accountData: {
        accountCategory: { type: String},
        accountImage: { type: String},
        accountId: { type: mongoose.Schema.Types.ObjectId, refPath: 'accountData.category'},
        accountName: { type: String}
    },
    likes: [LikeSchema],
    comments: [CommentSchema],
    share: { type: String}
});

module.exports = mongoose.model('Post', PostSchema);