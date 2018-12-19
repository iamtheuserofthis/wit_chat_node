var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator')
var expressSessions = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat')

var app = express();

var http = require('http')
var server = http.Server(app)   //an object of server class is given the express app

var io = require('socket.io')(server)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* settings for the html templating 
 app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator()) //must be used after the body parsor is being used
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSessions({'secret':'max', 'saveUninitialized':false, 'resave':false}))

//saveUninitialized whether to save the uninitialized session or not
//resave saves our session after each request even if the session was modified or unmodified.
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/chat', chatRouter);


io.on('connect',(socket)=>{
  console.log(socket.id)
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app:app, server:server};
