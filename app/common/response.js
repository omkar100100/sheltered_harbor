var util = require('util');

module.exports.handleSuccessResponse = function(statusCode, data, res, format) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  if (!format) {
    format = 'json';
  }

console.log("statusCode" + statusCode);
console.log("data" + data);

  switch (format) {
    case 'binary':
      console.log("Inside binary")
      res.end(data, 'binary');
      break;
    default:
      console.log("Inside default");
      res.status(statusCode).json(data);
      break;
  }
};

exports.handleError = function(err, res) {
  // if (err.formatError) {
  //   res.logger.error(err.formatError());
  // } else {
  //   res.logger.error(err.toString());
  // }

  var payload = {
    error: 'An unknown error has occurred',
    meta: {
      code: 999999,
      requestId: res.id
    }
  };

  var statusCode = 500;

  if (util.isError(err) && err.meta) {
    payload.error = err.meta.message;
    payload.meta.code = err.meta.code;
    payload.meta.errors = err.meta.errors;
    statusCode = err.meta.httpStatusCode ;
  }


    res.status(statusCode).json(payload);
};