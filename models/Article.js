
// 
// dependencies
const mongoose = require('mongoose');

// reference to Schema constructor
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({

  headline: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

// create model
const Article = mongoose.model('Article', ArticleSchema);

// export Article model
module.exports = Article;
