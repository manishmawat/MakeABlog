const express = require('express');
const Author = require('../models/author');
const router = express.Router();
const {Blog, validate} = require('../models/blog');
// router.use(express.json());

router.get('/',(req, res) =>{
        getBlog()
            .then(courses => {res.status(200).send(JSON.stringify(courses));})
            .catch(error => {res.status(500).send('Something went wrong....')});
    }
);

router.get('/:id',(req, res) => {
    getMyBlog(req.params.id)
            .then(blog => { res.status(200).send(blog) })
            .catch(error => { res.status(400).send(error)} );
})

router.post('/',(req,res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);

        const blog = new Blog({
            title:req.body.title,
            description:req.body.description,
            content:req.body.content,
            author:req.body.author,
            isPublished:req.body.isPublished,
            tags:req.body.tags
        })
        saveBlog(blog)
                .then(savedCourse => {
                    res.status(200).send(savedCourse);
                })
                .catch(error =>{
                    res.status(500).send(error);
                })
})

router.put('/:id', async (req,res) => {
        const {error} = validate(req.body);
        if(error) return res.status(404).send(error.details[0].message);    


        const newBlog = await Blog.findByIdAndUpdate(req.params.id, {
            title:req.body.title,
            description:req.body.description,
            content:req.body.content,
            author:req.body.author,
            isPublished:req.body.isPublished,
            tags:req.body.tags
        }, {
            new : true});
        console.log(newBlog);
        if(!newBlog) return res.status(404).send('Blog is not available.');

        res.send(newBlog);
})

router.delete('/:id',async (req,res) => {
    console.log(req.params.id);
    const blog = await Blog.findByIdAndRemove(req.params.id); 
    console.log(blog);
    if(!blog) return res.status(404).send('The blog with given id does not exist.');

    res.send(blog);
})

async function saveBlog(course){
    return await course
                    .save();
}

async function getBlog(){
    return await Blog
                        .find({});
                        // .populate('author')
                        // .select('name author');
}

async function getMyBlog(id){
    return await Blog.find({"_id": id})
                        .populate('author');
}

module.exports = router;