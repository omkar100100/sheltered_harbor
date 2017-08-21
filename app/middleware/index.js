// var auth = require('./auth');
// var vrdhooker = require('./vrdhooker');
var requestLogger = require('./requestLogger');
// var responseLogger = require('./responseLogger');
// var domains = require('./domain');

// module.exports.authenticator = auth.authenticator;
// module.exports.vrdhooker = vrdhooker.hooker;
module.exports.requestLogger = requestLogger.logger;
// module.exports.responseLogger = responseLogger.logger;
// module.exports.domainCreator = domains.domainCreator;