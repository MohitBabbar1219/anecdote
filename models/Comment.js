const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  parentId: {
    type: Schema.Types.ObjectId,
    refPath: 'onModel',
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'blogs',
    required: true
  },
  onModel: {
    type: String,
    required: true,
    enum: ['blogs', 'comments']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('comments', commentSchema);