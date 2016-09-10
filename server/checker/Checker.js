// TODO: log to file but to console when debug flag enable (read from config)
var config = require('../config');
var logger = require('winston');
var util = require('util');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var models = require('../server/models/index')(mongoose);
var Server = models.server;
var Statistics = models.statistics;

mongoose.connect(config.mongodbUrl);
mongoose.connection.once('open', function() {
    Server.find().then(function (servers) {
        servers.forEach(function(server) {
            logger.log('info', util.format('start checking server: %s', server.url));
            doRegistration(server.url, server.accountId, server.accountPassword).then(function(result) {
                logger.log('info', util.format('save result: url %s, pdd %s, ping %s',
                    server.url, result.pdd, result.ping));
                saveStats(server, result.pdd, result.ping);
            }, function(err) {
                logger.log('error', util.format('something goes wrong with %s, error: %s',
                    server.url, err));
                saveStats(server, -1, -1);
            });
        })
    }, function (err) {
        logger.log('error', util.format('error on getting servers step: %s', err));
    });
});

var doRegistration = function(host, user, password) {
    return new Promise(function(resolve, reject) {
        logger.log('info', util.format('start registration for: %s:%s@%s',
            user, password, host));
        // do reg with sipster
        resolve({pdd: 345.4, ping: 33.4});
    });
};

var saveStats = function(server, pdd, ping) {
    var stat = new Statistics({
        ping: ping,
        pdd: pdd,
        date: new Date(),
        parent: server._id
    });
    stat.save.then(function(err, stat) {
        logger.info('info', util.format('saved for %s: ping %s, pdd %s', server.url, stat.ping, stat.pdd));
    }, function(err){
        logger.info('error', util.format('didn\'t save: %s', err));
    });
};
