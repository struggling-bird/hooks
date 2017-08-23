var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');

var users = require('./routes/users');

var app = express();

app.use(history({
  logger: console.log.bind(console)
}))

// view engine setup
app.set('views', path.join(__dirname, 'static'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
  secret: 'zhuge hooks system',
  saveUninitialized: true,
  resave: false
}))

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'static')));

app.use(require('./filter/auth'))

app.use('/users', users);
app.use('/hook', require('./routes/hook'))
app.use('/api', require('./routes/api'))
app.use('/ssh', require('./routes/ssh'))

module.exports = app;
