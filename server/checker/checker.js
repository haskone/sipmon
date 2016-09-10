'use strict';

var config = require('../config');
var logger = require('../logger');
var util = require('util');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var models = require('../models/index')(mongoose);
var Server = models.server;
var Stat = models.stat;

mongoose.connect(config.mongodbUrl);
mongoose.connection.once('open', function() {
    logger.log('debug', 'successfully connected to mongodb, servers searching...');
    Server.find().then(function (servers) {
        servers.forEach(function(server) {
            logger.log('info', util.format('start checking a server: %s', server.url));
            doRegistration(server.url, server.accountId, server.accountPassword).then(function(result) {
                logger.log('debug', util.format('save results: url %s, pdd %s, ping %s',
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
        logger.log('debug', util.format('start registration for: %s:%s@%s',
            user, password, host));
        // TODO: do reg with sipster
        resolve({pdd: 345.4, ping: 33.4});
    });
};

var saveStats = function(server, pdd, ping) {
    var stat = new Stat({
        ping: ping,
        pdd: pdd,
        date: new Date(),
        parent: server._id
    });
    stat.save().then(function(stat) {
        logger.log('debug', util.format('saved for %s: ping %s, pdd %s',
            server.url, stat.ping, stat.pdd));
    }, function(err){
        logger.log('error', util.format('didn\'t save: %s', err));
    });
};
