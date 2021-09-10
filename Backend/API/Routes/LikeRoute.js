const express = require('express');
const Router = express.Router();
const Post = require('../Models/PostSchema');

Router.post('/', (req, res, next) => {
    const userid = req.body.userid;
    const postid = req.body.postid;
    const category = req.body.category;

    Post.findOne({postId: postid})
        .then(async post => {
            const alreadyliked = await post.likes.some(like => like.likeId == userid)

            if(alreadyliked === true){
                Post.updateOne( 
                    {
                        'postId': postid
                    },
                    { 
                        $pull: {
                            likes:  { likeId: userid} 
                        },
                        $inc: { 
                            numberOfLikes : -1
                        }
                    }
                )
                .then(() => {
                    res.status(200).json({
                        message: 'like removed from post'
                    });
                })
                .catch(error => {
                    res.status(400).json({
                        message: "could not update post",
                        error: error.message
                    })
                });
            } else{
                Post.updateOne( 
                    {
                        'postId': postid
                    },
                    { 
                        $push: {
                            likes: {userCategory: category, likeId: userid} 
                        },
                        $inc: { 
                            numberOfLikes : 1
                        }
                    }
                )
                .then(() => {
                    res.status(200).json({
                        message: 'like added to post'
                    });
                })
                .catch(error => {
                    res.status(400).json({
                        message: "could not update post",
                        error: error.message
                    })
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Unable to find user",
                error: error.message
            });
        });
});

module.exports = Router;