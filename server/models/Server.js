var mongoose = require('mongoose');

var ServerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  measurements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'measurement'
  }]
});

module.exports = mongoose.model('server', ServerSchema);