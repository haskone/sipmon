module.exports = function(mongoose) {
    var StatisticsSchema = new mongoose.Schema({
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
            ref: 'Server',
            index: true,
            required: true
        }
    });
    return mongoose.model('statistics', StatisticsSchema);
};