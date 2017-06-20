// Express dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// Database dependencies
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/coworkingdb');

// Application
var app = express();


/* ---
 * Routing
 */
var routes = require('./routes/routes');

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});


/* ---
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views/'));
app.engine('hbs', exphbs({
  extname: '.hbs',
  helpers: require('./public/js/helpers.js').helpers
}));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/* ---
 * Loggers and parsers
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* ---
 * Call the routes file (must be below the app.use statements above!)
 */
app.use('/', routes);


/* ---
 * Error handling
 */
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
