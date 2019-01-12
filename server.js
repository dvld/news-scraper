
// 
// dependencies
const express = require('express');
const exphbs = require('express-handlebars');

const mongojs = require('mongojs');
const mongoose = require('mongoose');

const cheerio = require('cheerio');
const axios = require('axios');

const db = require('./models');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news-scraper-db';

const PORT = process.env.port || 3000;

// init express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connect to mongo db
mongoose.connect(MONGODB_URI);

// use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



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

