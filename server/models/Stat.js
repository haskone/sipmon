module.exports = function(mongoose) {
    var StatSchema = new mongoose.Schema({
        // ping in ms
        ping: {
            type: Number,
            required: true
        },
        // post dial delay in ms
        pdd: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'server',
            index: true,
            required: true
        }
    });
    return mongoose.model('stat', StatSchema);
};