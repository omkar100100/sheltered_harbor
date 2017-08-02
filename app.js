var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var routes = require('./routes/index');
var config=require('./config');
var helmet=require('helmet');
var Web3 = require('web3');
var solc = require('solc');
var fs=require('fs');
var Wallet = require("ethers-wallet");
var Tx = require('ethereumjs-tx');
var Sequelize = require('sequelize');

var routes = require('./routes/index');
var users  = require('./routes/users');

//import {API} from 'ethereum/etherscan';

var currentConfig=config.getCurrentConfig();
console.log(currentConfig.app.port);

var app = express();
http.createServer(app).listen("8001",function(){
    console.log("Express Server Started");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));   
app.use('/', routes);
app.use('/user', users);


// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status( err.code || 500 )
//     .json({
//       status: 'error',
//       message: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
});

// app.use(helmet.csp({
//   defaultSrc: ["'self'"],
//   scriptSrc: ['*.google-analytics.com'],
//   styleSrc: ["'unsafe-inline'"],
//   imgSrc: ['*.google-analytics.com'],
//   connectSrc: ["'none'"],
//   fontSrc: [],
//   objectSrc: [],
//   mediaSrc: [],
//   frameSrc: []
// }));


//app.use(helmet.xssFilter());

// app.use(helmet.hsts({
//   maxAge: 7776000000,
//   includeSubdomains: true
// }));

/////////////////////////////////////////////////////////////////////////////////////////////



module.exports = app;
