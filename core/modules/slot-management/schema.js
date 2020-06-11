const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  date: {
    type: Date,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('slot', schema);