var config = {};

config.mongodbUrl = 'mongodb://127.0.0.1:27017/sipmon';
config.port = 3000;
config.sip_port = 5060;
config.loglevel = 'debug';
config.log_to = {'console': true,
                 'file': false};
config.logfile = '';

module.exports = config;
