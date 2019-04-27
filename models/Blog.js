const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  comments: [{
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('blogs', postSchema);