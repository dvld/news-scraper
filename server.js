
// 
// dependencies
const express = require('express');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');
const db = require('./models');

let PORT = 3000;

// init express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connect to mongo db
mongoose.connect('mongodb://localhost/news-scraper-db', { useNewUrlParser: true });

// routes

// scrape route
app.get('/scrape', function (req, res) {

  // grab the body
  axios.get('http://dnd.wizards.com/articles/news').then(function (response) {

    // load into cheerio
    var $ = cheerio.load(response.data);

    $('article.article-preview').each(function (i, element) {

      // empty result object
      let result = {};

      // info to scrape
      result.headline = $(this)
        .children()
        .find('div.content')
        .find('div.text')
        .find('h4')
        .children()
        .text();

      result.image = $(this)
        .children()
        .find('a')
        .children()
        .attr('src');

      result.summary = $(this)
        .children()
        .find('div.content')
        .find('div.text')
        .find('div.summary')
        .children()
        .text();

      result.url = $(this)
        .children()
        .find('a')
        .attr('href');

      // create new Article using result object
      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          console.log(err);
        });
    });

    // client message
    res.send('Scraping Complete');

  });
});

// get all articles from news-scraper-db
app.get('/articles', function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// saving Comments and associating with an article
app.post('/submit', function (req, res) {
  db.Comment.create(req.body)
    .then(function (dbComment) {
      return db.Article.findOneAndUpdate({}, { $push: { comments: dbComment._id } }, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// delete comment
app.delete('/comments/:id', function (req, res) {
  res.send('Deleting...');
  Comment.findById(req.params.id, function (err, comment) {
    comment.remove(function (err, comment) {
      res.render('index.js');
    });
  });
});

