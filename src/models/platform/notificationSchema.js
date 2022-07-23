const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  requester: {
    type: String,
    required: true,
  },
  requested: {
    type: String,
    required: true,
  },
  requestType: {
    type: String,
    enum: ['message', 'friendRequest'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    enum: ['sent', 'accepted', 'denied'],
    required: true,
    default: 'sent',

  },
}, { timestamps: true });

module.exports = mongoose.model('notification', notificationSchema);
