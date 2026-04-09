const router = require('express').Router()
const Post = require("../model/post");

router.post("/", async (req, res) => {
    const { imageUrl, caption } = req.body

    try {
        const newPost = new Post({
            imageUrl,
            caption,
            comments: []
        })
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})



router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put("/:id/comment", async (req, res) => {
    const { text } = req.body;
    try {
        const post = await Post.findById(req.params.id);

        post.comments.push({ text });
        await post.save();

        res.json(post);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete("/:id/deletePost",async(req,res)=>{
    try{
        const delPost = await Post.findByIdAndDelete(req.params.id)

         if (!delPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
        
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

module.exports = router;