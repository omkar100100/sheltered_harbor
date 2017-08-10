
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

// var TokenSigner = require('jwt-js').TokenSigner;
// var decodeToken = require('jwt-js').decodeToken;

//     rawPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f',
//     tokenPayload = {"issuedAt": "1440713414.85", 
//     "challenge": "7cd9ed5e-bb0e-49ea-a323-f28bde3a0549", 
//     "issuer": 
//         {"publicKey": "03fdd57adec3d438ea237fe46b33ee1e016eda6b585c3e27ea66686c2ea5358479", 
//         "chainPath": "bd62885ec3f0e3838043115f4ce25eedd22cc86711803fb0c19601eeef185e39", 
//         "publicKeychain": "xpub661MyMwAqRbcFQVrQr4Q4kPjaP4JjWaf39fBVKjPdK6oGBayE46GAmKzo5UDPQdLSM9DufZiP8eauy56XNuHicBySvZp7J5wsyQVpi2axzZ", 
//         "blockchainid": "ryan"
//         }
//     },


//     token = new TokenSigner('ES256k', rawPrivateKey).sign(tokenPayload)

//     console.log(token);
    
//     tokenData = decodeToken(token)
//     console.log(tokenData);

var currentConfig=config.getCurrentConfig();
console.log(currentConfig.app.port);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));   

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


models.Role.sync().then(function(){
    models.User.sync().then(function(){
        models.AccessLog.sync().then(function(){
          models.IdType.sync().then(function(){
            models.QuorumNode.sync().then(function(){
                models.Institute.sync().then(function(){
                  models.PasswordRecovery.sync().then(function(){
                    models.SHLog.sync().then(function(){
                        models.ServiceProviderMapping.sync().then(function(){
                            models.UserInstitute.sync().then(function(){
                                models.InstituteHistory.sync().then(function(){
                                        // models.Registration.sync().then(function(){
                               
                                        // })
                                })
                            })
                        })
                    })
                  })
                })
            })
          })     
        })  
    })
})

//app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.use(function(err, req, res, next) {
   console.log(err);
    res.status(err.status || 500)
  .json({
    status: 'error',
    message: err
  });
});


module.exports = app;


