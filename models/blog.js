const mongoose = require('mongoose');
const {Author ,authorSchema} = require('./author');
const Joi = require('joi');

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
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author'
        },
    isPublished:{type:Boolean, required:true},
    date:{type:Date, default:Date.now},
    likes:{type:Number, min:0},
    comments: {type : String}
})

// Step3: create a model.
const Blog = mongoose.model('Blog', blogSchema);


function validateBlog(blog){
    const schema = {
        // id:Joi.string(),
        title: Joi.string().min(5).required(),
        description:Joi.string(),
        content:Joi.string().min(100).required(),
        author: Joi.objectId().required(),
        isPublished:Joi.boolean(),
        tags:Joi.array().items(Joi.string()).min(1),
        date:Joi.date()
    }
    return Joi.validate(blog,schema);
}

exports.Blog=Blog;
exports.validate = validateBlog;