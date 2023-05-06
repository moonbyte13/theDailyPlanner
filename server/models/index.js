// models/Widgets/Widget.js

const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
