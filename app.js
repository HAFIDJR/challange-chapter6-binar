require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sentry = require('@sentry/node')
const {SENTRY_DSN} = process.env
var indexRouter = require('./routes/index.routes');
const imgRouter = require('./routes/image.routes')




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


Sentry.init({
  dsn : SENTRY_DSN,
  integrations : [
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0,
  environment : 'development'
})

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());


app.use('/', indexRouter);
app.use('/api/v1',imgRouter);

app.use(Sentry.Handlers.errorHandler());
// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
  return res.status(404).json({
    status: false,
    message: "Not Found",
    error: err.message,
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  return res.status(500).json({
    status: false,
    message: "Internal Server error",
    error: err.message,
  });
});

module.exports = app;
