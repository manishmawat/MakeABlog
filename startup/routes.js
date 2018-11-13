const express = require('express');
const error = require('../middleware/error');
const blogs = require('../routers/blogs');
const author = require('../routers/authors');
const users = require('../routers/users');
const auth = require('../routers/auth');


module.exports = function(app){
// app middleware
app.use(express.json());
app.use('/api/blogs',blogs);
app.use('/api/authors',author.authorRouter);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use(error);
}