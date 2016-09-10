module.exports = function(mongoose) {
    return {
        server: require('./Server.js')(mongoose),
        stat: require('./Stat.js')(mongoose)
    };
};