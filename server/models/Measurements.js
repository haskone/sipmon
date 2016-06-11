var mongoose = require('mongoose');

var MeasurementSchema = new mongoose.Schema({
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
    type: String,
    required: true
  }
});

module.exports = mongoose.model('measurement', MeasurementSchema);