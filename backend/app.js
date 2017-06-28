var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var instantMongoCrud = require('express-mongo-crud');

//Logger
var logger = require('morgan');

var cookieParser = require('cookie-parser');
//passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var PORT = 3000;

var auth = require('./routes/auth');
var users = require('./routes/users');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(passport.initialize());
app.use(passport.session());



app.use(auth);
app.use('/users', users);

// passport config
var Users = require('./models/users.js');
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());



mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/mongocrud')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//app.use(bodyParser.json()); // add body parser (required)
var options = { //specify options
    host: `localhost:${PORT}`
}
app.use(instantMongoCrud(options)); // INCLUDE OUR MIDDLEWARE

// router.get('/myapi', function(req, res){
//     res.send('works well');
// });
//
// app.use(router);


app.listen(PORT, ()=>{
    console.log('started at '+PORT);
})

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
        res.status(err.status || 500)
           .json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
       .json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
