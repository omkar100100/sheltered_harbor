
var Sequelize = require('sequelize');
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
var fs=require('fs');
var users  = require('./routes/users');
var master=require('./routes/masterData');
var roles=require('./routes/roles');
var nodes=require('./routes/quorumNode');
var institute=require('./routes/institute');
var shLog=require('./routes/shLog');
var cors = require('cors');



//var currentConfig=config.getCurrentConfig();
//console.log(currentConfig.app.port);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.set('models', require('./app/models'));
var models = app.get('models');

app.use('/role',roles);
app.use('/user',users);
app.use('/node',nodes);
app.use('/institute',institute);
app.use('/shlog',shLog);
app.use('/master',master);

//models.sequelize.sync({force:true}).then(function () {
    console.log("Models Synchronized");
    http.createServer(app).listen("8001",function(){
        console.log("Express Server Started");
    });
//});


// models.Role.sync().then(function(){
//     models.User.sync().then(function(){
//         models.AccessLog.sync().then(function(){
//           models.IdType.sync().then(function(){
//             models.QuorumNode.sync().then(function(){
//                 models.Institute.sync().then(function(){
//                   models.PasswordRecovery.sync().then(function(){
//                     models.SHLog.sync().then(function(){
//                         models.ServiceProviderMapping.sync().then(function(){
//                             models.UserInstitute.sync().then(function(){
//                                 models.InstituteHistory.sync().then(function(){
//                                         // models.Registration.sync().then(function(){
                               
//                                         // })
//                                 })
//                             })
//                         })
//                     })
//                   })
//                 })
//             })
//           })     
//         })  
//     })
// })

//app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   next();
// });

app.use(function(err, req, res, next) {
   console.log(err);
    res.status(err.status || 500)
  .json({
    status: 'error',
    message: err
  });
});


module.exports = app;


