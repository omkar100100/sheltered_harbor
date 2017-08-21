var config = require('./config');
var currentConfig = config.getCurrentConfig();
var middleware = require('./app/middleware');
var logging = require('./app/logging');
var events = require('events');

var env = null;


var Environment=function(){
  this.app=null;
}

Environment.prototype = new events.EventEmitter();

Environment.prototype.getCurrentConfig = function() {
  return currentConfig;
};

Environment.prototype.initialize=function(app){
  this.app=app;

  this.initializeLogging();
  app.use(middleware.requestLogger());
  
}


Environment.prototype.initializeLogging = function() {
  var logconfig = currentConfig.logging;
  logging.initialize(logconfig);
};


module.exports = (function() {
  if (!env) {
    env = new Environment();
  }
  return env;
})();