const mongoose = require('mongoose');

const express = require('express');

const router = express.Router();
// router.use(express.json());
//MongoDb work
//MongoDb connection
// Step1: create a connection.
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true})
        .then(() => console.log('Connected to MongoDB....'))
        .catch(err => console.log('Unable to connect to MongoDB', err));

// Step2: create a schema.
const blogSchema = new mongoose.Schema({
    title: {type:String, required:true, minlength:5, maxlength:100},
    description: {type:String},
    content: {type:String, required:true, minlength:100},
    // tags:{type:[String]},
    tags:{type:Array,
                validate:{
                    validator: function(v){
                        return v && v.length >0;
                    },
                    message: 'Atleast one tag is required'
                }},
    author:{type:String, minlength:3,maxlength:20},
    isPublished:{type:Boolean, required:true},
    date:{type:Date, default:Date.now}
})

// Step3: create a model.
const Blog = mongoose.model('Blog', blogSchema);

router.get('/',(req, res) =>{
        getBlog()
            .then(courses => {res.status(200).send(JSON.stringify(courses));})
            .catch(error => {res.status(500).send('Something went wrong....')});
    }
);

router.get('/:id',(req, res) => {
    getMyBlog(req.params.id)
            .then(blog => { res.status(200).send(blog) })
            .catch(error => { res.status(400).send('Blog not found')} );
})

router.post('/',(req,res) =>{
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
                res.status(500).send('Something went wrong.... We are working on it.');
            })
})

async function saveBlog(course){
    return await course
                    .save();
}

async function getBlog(){
    return await Blog
                        .find({});
}

async function getMyBlog(id){
    return await Blog.find({"_id": id});
}

module.exports = router;