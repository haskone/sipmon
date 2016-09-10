module.exports = function(mongoose) {
    // A server with test account for testing registration
    var ServerSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        accountId: {
            type: String,
            required: true
        },
        accountPassword: {
            type: String,
            required: true
        }
    });
    return mongoose.model('server', ServerSchema, 'server');
};