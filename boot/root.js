var users  = require('../routes/users');
var master=require('../routes/masterData');
var roles=require('../routes/roles');
var nodes=require('../routes/quorumNode');
var institute=require('../routes/institute');
var shLog=require('../routes/shLog');

module.exports = function(server) {

  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

 
  server.use('/role',roles);
  server.use('/user',users);
  server.use('/node',nodes);
  server.use('/institute',institute);
  server.use('/shlog',shLog);
  server.use('/master',master);

  server.use(router);
};
