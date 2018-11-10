const express = require('express');

const blogs = require('./blog');

//Server creation
// const http = require('http');
// const https = require('https');
const app = express();

// app middleware
app.use(express.json());
app.use('/api/blog',blogs);

app.listen(3000,() => console.log('Listening on port 3000'));
// http.createServer(app).listen(3000,() =>{console.log('listening at port 3000')});

app.set('Route')