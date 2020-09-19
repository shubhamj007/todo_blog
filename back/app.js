//instantiate configuration variables
require('./config/config');
require('./global_functions'); //instantiate global functions

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const api = require('./routes/api');
const cors = require("cors");

const app = express();

app.use(logger('dev'));
app.use(cors());

// app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Passport
app.use(passport.initialize());

//DATABASE
const models = require("./models");

// models.sequelize.authenticate().then(() => {
//         console.log('Connected to SQL database:', CONFIG.db.name);
//     })
//     .catch(err => {
//        Raven.captureException(err);
//         console.error('Unable to connect to SQL database:', CONFIG.db.name, err);
//     });

if (CONFIG.app.name === 'dev') {
    models.sequelize.sync(); //creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}
// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: PUT, GET, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

app.use('/api', api);

app.use('/', function (req, res) {
    res.statusCode = 200; //send the appropriate status code
    res.json({
        status: "success",
        message: "Parcel Pending API",
        data: {}
    })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log()
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err,"***********");
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    // res.render('error');
});

module.exports = app;