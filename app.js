var express = require('express');
var path = require('path');
var fs = require("fs");

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('port', (process.env.PORT || 5000));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*
function loadHomePage(req, res)
{
    fs.readFile('/views/newfeatures.html', function(err, HTMLdata)
            {
                        //the callback functions typically have at least two variables: err, which is an error code if an error happens, and then data, which is the information you got from your request
                if(err)
                {
                    console.log(err);
                }
                else
                { 
                    res.writeHead(200,
                  {
                    'Content-type': 'text/HTML; charset-utf-8'
                  });
                  res.end(HTMLdata);
                }
        //this if statement will run after the file has either loaded sussessfully or failed - if it failed, an error will be logged to the console. If it succeeded, it will send a respond to the browser
        //this function is called from inside of our createServer function, which is where the request and response variables come from
            });
}
*/

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;




app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

