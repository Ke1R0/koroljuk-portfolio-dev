require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
require('./app_api/db');
require('./app_api/config/passport');
var routesApi = require('./app_api/routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'app_client', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());
app.use('/api', routesApi);

// Fallback - return index page when path not found
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

module.exports = app;
