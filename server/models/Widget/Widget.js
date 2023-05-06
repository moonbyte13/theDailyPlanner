const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: String,
  content: String,
  position: {
    x: Number,
    y: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
