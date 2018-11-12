const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{type:String},
    email:String,
    company:String,
    hobbies:[String]
});

const Author = mongoose.model('author', authorSchema);

exports.Author= Author;
module.exports.authorSchema = authorSchema;