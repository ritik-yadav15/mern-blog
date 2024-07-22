const router = require("express").Router();
const blogs = require("../models/blogs")


// post
router.post("/post", async(req,res)=>{
    try {
        
        const {title , desc} =  req.body;
        const newPost =  new blogs({title, desc})
        await newPost.save().then(()=>res.status(200).json({message:"Data saved successfully"}))
    } catch(error) {
        res.status(400).json({message:"some error occured"})
    }

})
// get
router.get("/getAll", async(req,res)=>{
    try {
        
        const data = await blogs.find().sort({createdAt: -1})
        res.status(200).json({data:data})
    } catch(error) {
        res.status(400).json({message:"some error occured"})
    }

})
// get recent blogs
router.get("/getRecentBlogs", async(req,res)=>{
    try {
        
        const data = await blogs.find().sort({createdAt: -1}).limit(3);
        res.status(200).json({data:data})
    } catch(error) {
        res.status(400).json({message:"some error occured"})
    }

})

// get blogs by id
router.get("/getBlogs/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const data = await blogs.findById(id)
        res.status(200).json({data:data})
    } catch(error) {
        res.status(400).json({message:"some error occured"})
    }

})
// get blogs update by id
router.put("/updateBlog/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const {title , desc} =  req.body;
        await blogs.findByIdAndUpdate(id,{title,desc})
        res.status(200).json({message:"data update successfully"})
    } catch(error) {
        res.status(400).json({message:"some error occured"})
    }

})

// delete blogs by id
router.delete("/delete/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await blogs.findById(postId);

        if (!post.delete) { // Check boolean false
            return res.status(403).json({ message: "This blog post cannot be deleted" });
        }

        await blogs.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Some error occurred" });
    }
});


module.exports = router