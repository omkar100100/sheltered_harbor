
var Sequelize = require('sequelize');
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env=require('./environment')
var webSocket = require('websocket');
var swaggerJSDoc = require('swagger-jsdoc');
var unless = require('express-unless');

var helmet=require('helmet');
var fs=require('fs');
const jwt = require('express-jwt');
var routes = require('./routes/index');
var users  = require('./routes/users');
var master=require('./routes/masterData');
var roles=require('./routes/roles');
var nodes=require('./routes/quorumNode');
var institute=require('./routes/institute');
var shLog=require('./routes/shLog');
var dashboard=require('./routes/dashboard');
var config = require('./config');
var currentConfig = config.getCurrentConfig();
const swaggerUi = require('swagger-ui-express');
var app = express();

env.initialize(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});


 
 var swaggerHost=null;

if(process.env.NODE_ENV=='test'){
  swaggerHost='shapp1.eastus.cloudapp.azure.com';
}else if(process.env.NODE_ENV=='dev' || process.env.NODE_ENV=='swagger_dev' ){
  swaggerHost= currentConfig.swagger.host + ':' + currentConfig.swagger.port;
}else{
  swaggerHost='shapp1.eastus.cloudapp.azure.com';
}
var swaggerDefinition = {
  info: {
    title: 'Sheltered Harbor API',
    version: '1.0.0',
    description: "Sheltered Harbor LOG MONITORING API for Admins"
  },
  host: swaggerHost,
  basePath: '/',
  securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
  security: [
      { jwt: [] }
    ]
  
};

var showExplorer = true;
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
  validatorUrl : null
};

const swaggerSpec = swaggerJSDoc(options);
const docsJsonPath = '/swagger.json';
const swaggerUiHandler = swaggerUi.setup(swaggerSpec);


app.get(docsJsonPath, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUi.serve, (req, res, next) => {
   swaggerUiHandler(req, res, next);
});
  
app.set('models', require('./app/models'));
var models = app.get('models');


app.use('/', express.static(path.join(__dirname, 'frontend')));

app.get('/login', (req,res) => res.sendFile(path.join(__dirname+'/frontend/index.html')))

app.use(jwt({ secret: process.env.AUTHENTICATION_SECRET }).unless({
  path: [
    { url: '/user/authenticate', methods: [ 'POST','OPTIONS']  },
    { url: '/user/create_password'},
    { url: '/login'},
    { url: '/user', methods: ['POST']  },
    { url : '/participant/register', methods: [ 'POST','OPTIONS'] },
    { url : '/shlog/submit', methods: [ 'POST','OPTIONS'] },
    { url : '/^\/shlog\/.*/', methods: [ 'GET','OPTIONS'] }
  ]
}));



app.use('/role',roles);
app.use('/user',users);
app.use('/node',nodes);
app.use('/participant',institute);
app.use('/shlog',shLog);
app.use('/master',master);
app.use('/dashboard',dashboard);





    http.createServer(app).listen(currentConfig.app.server.port,function(){
        console.log("Express Server Started");
    });



models.Role.sync().then(function(){
    models.User.sync().then(function(){
        models.IdType.sync().then(function(){
            models.QuorumNode.sync().then(function(){
                models.Institute.sync().then(function(){
                  models.PasswordRecovery.sync().then(function(){
                    models.SHLog.sync().then(function(){
                            models.UserInstitute.sync().then(function(){
                                models.InstituteHistory.sync().then(function(){
                                  models.RegisterContract.sync().then(function(){
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

app.use(function(err, req, res, next) {
   console.log(err);
    res.status(err.status || 500)
  .json({
    status: 'error',
    message: err
  });
});


module.exports = app;


