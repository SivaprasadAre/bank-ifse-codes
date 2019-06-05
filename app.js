var express = require('express');
var app = require('express')();
var mongoose = require('mongoose');
var ejs = require('ejs');

app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/exampledb', {
  useCreateIndex: true,
  useNewUrlParser: true
});

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('./views'));

app.get('/', function (req, res) {
  var homeObj = {};
  homeObj = {
    drinks: null,
    tagline: null,
    uplodeBuiten: false,
    current: 1,
    pages: 0
  }
  res.render('home', homeObj);
});

app.get('/newrecord', function (req, res) {
  res.render('register');
});

app.post('/create', require('./template.js').create);
app.get('/template', require('./template.js').get);

app.listen(8000, function () {
  console.log("http://localhost:8000");
});
