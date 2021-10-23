const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req,res) =>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost); 
    }catch(e){
        res.status(500).json(e);
    }
})

//update a post 
router.put("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.update({$set:req.body});
            res.status(200).json("the post has been updated");
        }else{
            res.status(403).json("you can only update your own post");
        }
    }catch(e){
        res.status(500).json(err);
    }
})
//delete a post 
router.delete("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        }else{
            res.status(403).json("you can only delete your own post");
        }
    }catch(e){
        res.status(500).json(err);
    }
})
//like/unlike a post 
router.put("/:id/like", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("liked the post");
        } else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("unliked the post");
        }
    }catch(e){
        res.status(500).json(e);
    }
})
//get a post 
router.get("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(e){
        res.status(500).json(e);
    }
});

//get feed posts
router.get("/feed/:userId", async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) =>{
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));

    } catch(e) {
        res.status(500).json(e);
    }
});
//get users's all posts

router.get("/profile/:username", async (req, res) => {
    try{
        const user = await User.findOne({ username: req.params.username});
        const posts = await Post.find({ userId: user._id});
        res.status(200).json(posts);

    } catch(e) {
        res.status(500).json(e);
    }
});


module.exports = router;