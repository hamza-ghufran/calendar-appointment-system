const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  title: {
    type: String,
    required: true
  },

  subject: {
    type: String,
  },

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

  active: {
    type: Boolean,
    default: true
  },

  archive: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('event', schema);
