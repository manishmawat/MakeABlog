const winston = require('winston');
const error = require('./middleware/error');
const express = require('express');
//Server creation
// const http = require('http');
// const https = require('https');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config');
require('./startup/validation');
app.listen(3000,() => winston.info('Listening on port 3000'));