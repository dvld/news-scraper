
// 
// dependencies
const mongoose = require('mongoose');

// reference to Schema constructor
const Schema = mongoose.Schema;

// create schema object
let CommentSchema = new Schema({

  comment: {
    type: String,
    required: true
  },

  deleted: {
    type: Boolean,
    default: false
  }
});

// create model
const Comment = mongoose.model('Comment', CommentSchema);

// export module
module.exports = Comment;