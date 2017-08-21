var logging = require('../logging/');

var LOG_FORMAT = 'REQUEST  - :request-id - :remote-addr - :method :url';

module.exports.logger = function() {
  return function(req, res, next) {
    var msg = LOG_FORMAT.replace(':request-id', req.id)
    .replace(':url', req.originalUrl)
    .replace(':method', req.method)
    .replace(':remote-addr', req.ip || req._remoteAddress || (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress))));

    logging.getLog4jsLogger().log('INFO', msg);

    next();
  };
};