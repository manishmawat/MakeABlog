const winston = require('winston');
require('winston-mongodb');

module.exports = function(){

//#region 
//Below code showing, how the unhandled exception works in node
// //This always recommended to exit the process when we caught unhandled exceptions
// // and restart the node process again
// //This event only catch the synchronous exception
// process.on('uncaughtException', (ex) => {
//         winston.error(ex.message,ex);
//         process.exit(1);
// });

// //This event will handle the unhandled promise rejections.
// process.on('unhandledRejection', (ex) => {
//         winston.error(ex.message,ex);
//         process.exit(1);
// });
//#endregion
//There is an alternate to handle uncaught and unhandle exceptions in node using winston
winston.handleExceptions(
    new winston.transports.Console({colorize:true, prettyPrint: true}),
    new winston.transports.File({filename:'uncaughtExceptions.log'})
);

//This exception will be caught by above handler.
process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(winston.transports.File,{filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {
    db:'mongodb://localhost/makeitblog_logs',
    level:'info'
});
}