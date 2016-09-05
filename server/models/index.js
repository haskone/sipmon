module.exports = function(mongoose) {
    return {
        server: require('./Server.js')(mongoose),
        statistics: require('./Statistics.js')(mongoose)
    };
};