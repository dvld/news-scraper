
// 
// dependencies
const mongoose = require('mongoose');

// reference to Schema constructor
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({

  id: {
    type: Number,
    uinque: true,
    required: true
  },

  // required string
  headline: {
    type: String,
    required: true
  },

  // required string
  url: {
    type: String,
    required: true
  },

  // required string
  image: {
    type: String,
    required: true
  },

  // required string
  summary: {
    type: String,
    required: true
  },

  // stores object id, links to Comment model
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

// create model
const Article = mongoose.model('Article', ArticleSchema);

// export Article model
module.exports = Article;
