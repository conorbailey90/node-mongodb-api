const express = require('express');
const Post = require('../models/post');
const router = express.Router();


// Get all
router.get('/', async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(error){
        res.status(500).json({message: error.message})
    }

})

// Get one post

router.get('/:id', getPost, async (req,res)=>{    

        res.json(res.post)
})

// Create post
router.post('/', checkPassword, async (req,res)=>{
   
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        image: req.body.image,
        date: Date.now()
    })

    try{
        const newPost = await post.save();
        res.status(201).json(newPost)
    }catch(err){
        res.status(400).json({message : err.message})

    }

})


// Update
router.patch('/:id',checkPassword, getPost, async (req,res)=>{
    if(req.body.title !== null){
        res.post.title = req.body.title;
    }
    if(req.body.author !== null){
        res.post.author = req.body.author;
    }
    if(req.body.body !== null){
        res.post.body = req.body.body;
    }
    if(req.body.image !== null){
        res.post.image = req.body.image;
    }

    try{
        const updatedPost = await res.post.save()
        res.json(updatedPost);
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


router.delete('/:id',checkPassword, getPost, async (req,res)=>{
    try{
        await res.post.remove()
       res.json({message: "Deleted successfully"})
    }catch(err){
       res.status(500).json({message: err.message})
    }
})



async function getPost(req, res, next){
   let post;
 
   try{
       post = await Post.findById(req.params.id);
       console.log(post)
       if(post == null){
           return res.status(404).json({message: `No post with id: ${req.params.id}.`})
       } 
       
   }catch(err){
       res.status(500).json({message: err.message});
   }
   res.post = post;
   next();

}

function checkPassword(req,res,next){
    const auth = {username: process.env.API_USERNAME, password: process.env.API_PASSWORD };

     // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        console.log(b64auth);

        const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
        console.log(username)
        console.log(password)

          // Verify login and password are set and correct
        if (username && password && username === auth.username && password === auth.password) {
            // Access granted...
            return next()
        }

        return res.status(401).json({message: "Access denied"})
 
}



module.exports = router;