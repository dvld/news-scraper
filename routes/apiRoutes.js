
// 
// dependencies
const express = require('express');
const router = express.Router();

const Article = require('../models/Article');
const Comments = require('../models/Comments');

// routing

// get all articles from news-scraper-db
router.get('/articles', function (req, res) {
  Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// saving Comments and associating with an article
router.post('/comments/:id', function (req, res) {
  Comments.create(req.body)
    .then(function (dbComment) {
      return Article.findOneAndUpdate({}, { $push: { comments: dbComment._id } }, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// delete comment
router.delete('/comments/:id', function (req, res) {
  res.send('Deleting...');
  Comments.findById(req.params.id, function (err, comment) {
    comment.remove(function (err, comment) {
      res.render('main');
    });
  });
});

// export module
module.exports = router;
