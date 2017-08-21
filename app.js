
var Sequelize = require('sequelize');
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env=require('./environment')
var webSocket = require('websocket');

var helmet=require('helmet');
var fs=require('fs');

//var config=require('./config');
var routes = require('./routes/index');
var users  = require('./routes/users');
var master=require('./routes/masterData');
var roles=require('./routes/roles');
var nodes=require('./routes/quorumNode');
var institute=require('./routes/institute');
var shLog=require('./routes/shLog');
var dashboard=require('./routes/dashboard');


var swaggerJSDoc = require('swagger-jsdoc');


var swaggerDefinition = {
  info: {
    title: 'Sheltered Harbor API',
    version: '1.0.0',
    description: "Sheltered Harbor LOG MONITORING API for Admins"
  },
  host: 'shapp1.eastus.cloudapp.azure.com',
  basePath: '/',
};


var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);

var app = express();

env.initialize(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));


app.set('models', require('./app/models'));
var models = app.get('models');

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.use('/role',roles);
app.use('/user',users);
app.use('/node',nodes);
app.use('/participant',institute);
app.use('/shlog',shLog);
app.use('/master',master);
app.use('/dashboard',dashboard);

//models.sequelize.sync({force:true}).then(function () {
    console.log("Models Synchronized");
    http.createServer(app).listen("8001",function(){
        console.log("Express Server Started");
    });
//});



//  ws=webSocket.server({
//     httpServer: http,
//     autoAcceptConnections: true,
//     maxReceivedFrameSize: 64*1024*1024,   // 64MiB
//     maxReceivedMessageSize: 64*1024*1024, // 64MiB
//     fragmentOutgoingMessages: false,
//     keepalive: false,
//     disableNagleAlgorithm: false
// });

//  wsrouter=webSocket.router;

 //wsrouter.attachServer(ws);

// ws.on('connect',function(connection){
//   console.log("Web socket server started")
//   function sendCallback(err) {
//         if (err) {
//           console.error('send() error: ' + err);
//           connection.drop();
//           setTimeout(function() {
//             process.exit(100);
//           }, 100);
//         }
//     }

//     connection.sendUTF("Hello World", sendCallback);
// })



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

app.use(function(err, req, res, next) {
   console.log(err);
    res.status(err.status || 500)
  .json({
    status: 'error',
    message: err
  });
});


module.exports = app;


