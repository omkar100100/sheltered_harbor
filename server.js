// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-ssl
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var loopback = require('loopback');
var boot = require('loopback-boot');
var loopbackSSL = require('loopback-ssl');
var bodyParser = require('body-parser');



var http = require('http');
var https = require('https');
var sslConfig = require('./ssl-config');

var app = module.exports = loopback();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('models', require('./app/models'));
var models = app.get('models');

// boot scripts mount components like REST API
boot(app, __dirname, function(err) {
  if (err) throw err;
});



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


//return loopbackSSL.startServer(app);

app.start = function(httpOnly) {
  if (httpOnly === undefined) {
    //console.log("PARAM:" + process.argv[2]);
    //httpOnly = process.argv[2];
  }
  var server = null;
  if (false) {
    var options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
    };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }
  server.listen(app.get('port'), function() {
   // var baseUrl = (httpOnly ? 'http://' : 'https://') + app.get('host') + ':' + app.get('port');
    //app.emit('started', baseUrl);
    //console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

// // start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
