'use strict';

var config = require('./config');
var dateFormat = require('dateformat');
var winston = require('winston');

var timestamp = function() {
    return dateFormat(Date.now(), 'yyyy-mm-dd h:MM:ss');
};
var formatter = function(options) {
    return options.timestamp() + ' '+ options.level.toUpperCase() + ' ' +
        (undefined !== options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t' +
        JSON.stringify(options.meta) : '' );
};
var transports = [];

if (config.log_to.console) {
    transports.push(new (winston.transports.Console)({
        timestamp: timestamp,
        formatter: formatter,
        level: config.loglevel
    }));
}

if (config.log_to.file) {
    if (!config.logfile) {
        console.log('Log file is not configured! Please check the config file');
        process.exit(1);
    }
    transports.push(new (winston.transports.File)({
        timestamp: timestamp,
        level: config.loglevel,
        filename: config.logfile
    }));
}

var logger = new (winston.Logger)({
    transports: transports
});

module.exports = logger;