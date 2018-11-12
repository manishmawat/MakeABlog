const config = require('config');
const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const express = require('express');

const blogs = require('./routers/blogs');
const author = require('./routers/authors');
const users = require('./routers/users');
const auth = require('./routers/auth');

const mongoose = require('mongoose');

if(!config.get('jwtPrivateKey')){
        console.error('FATAL ERROR: jwtPrivateKet is not defined');
        process.exit(1);
}

//MongoDb work
//MongoDb connection
// Step1: create a connection.
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true})
        .then(() => console.log('Connected to MongoDB....'))
        .catch(err => console.log('Unable to connect to MongoDB', err));
//Server creation
// const http = require('http');
// const https = require('https');
const app = express();

// app middleware
app.use(express.json());
app.use('/api/blogs',blogs);
app.use('/api/authors',author.authorRouter);
app.use('/api/users',users);
app.use('/api/auth',auth);

app.listen(3000,() => console.log('Listening on port 3000'));