// const logger = require('../middleware/winston-logger');
const winston = require('winston');

function error(err, req, res, next){
    // logger.log('info','message from logger',err);
    winston.error(err.message,err);
    res.status(500).send('Its our fault');
};

module.exports=error;