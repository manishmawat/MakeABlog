const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    //MongoDb work
//MongoDb connection
// Step1: create a connection.
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true})
.then(() => console.log('Connected to MongoDB....'));
}