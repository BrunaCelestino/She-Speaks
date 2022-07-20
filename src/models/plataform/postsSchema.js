const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    attachments: {
      type: [String],
    },
    clicks: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          default: mongoose.Types.ObjectId,
        },
        commentUsername: {
          type: String,
          required: true,
        },
        replyBody: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('post', postSchema);
