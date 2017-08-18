var _ = require('lodash');
var util = require('util');

var common = require('./common');


Error.prototype.formatError = function() {
  var msg = '';
  if (this.meta) {
    msg = this.meta.message + ' - ';
    msg = msg + this.meta.code + ' - ';
  }
  msg = msg + this.stack;
  return msg;
};

var errorcodes = {};
_.extend(errorcodes, common);

module.exports.errorcodes = errorcodes;

module.exports.normalizeError = function(errorCodeName, err, args, errors) {
  if (err && err.meta) {
    return err;
  }

  var errData = errorcodes[errorCodeName];

  if (err) {
    switch (err.name) {
      case 'SequelizeUniqueConstraintError':
        errData = errorcodes['UNIQUE_CONSTRAINT_FAILED'];
       // errData.message = err.message;
        args=Object.getOwnPropertyNames(err.fields);
        break;
    }
  }

  if (!err) {
    err = new Error(errData.message);
  }


  if (!util.isError(err)) {
    err = new Error(err.message ? err.message : err);
  }

  err.meta = {};
  err.meta.code = errData.code;
  err.meta.httpStatusCode = errData.httpStatusCode;
  err.meta.errors = errData.errors || errors;
  if (args) {
    err.meta.message = errData.message;
    if(_.isArray(args)) {
      for (var i = 0;i<args.length;i++) {
        err.meta.message = util.format(err.meta.message, args[i]);
      }      
    } else {
      err.meta.message = util.format(err.meta.message, args);
    }

    
  } else {
    err.meta.message = errData.message;
  }
  return err;
};
