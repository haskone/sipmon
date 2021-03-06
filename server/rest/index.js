'use strict';

var config = require('../config');
var express = require('express');
var logger = require('../logger');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUrl);
mongoose.connection.once('open', function() {

    app.models = require('../models/index')(mongoose);
    var routes = require('./routes');

    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    logger.log('info', 'Listening on port ' + config.port + '...');
    app.listen(config.port);
});