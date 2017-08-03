var express = require('express');
var models  = require('../app/models');
var acl = require('express-acl');
var attestationController=require('../app/controllers/attestationController');

// var router = express.Router();
// router.get('/', function(req, res) {
//   models.User.findAll({
//    include: [ models.AccessLog ]
//   }).then(function(users) {
//       res.json(users);
//   });
// });

      acl.config({
        filename: 'nacl.json',
        baseUrl: 'sh'
      });


      var ROUTER = express.Router();


      ROUTER.use(acl.authorize.unless({
         path: ['/sh/attestation']
       }));

      ROUTER.route('/sh/attestation')
      .post(function(req, res) {
        res.send({
          message: 'Access granted'
        });
      })
      

      .get(function(req,res){
         return   attestationController.getSHLogs(req,res);
      })
      .put(function(req, res) {
        res.send({
          message: 'Access granted'
        });
      })
      .delete(function(req, res) {
        res.send({
          message: 'Access granted'
        });
      });


      ROUTER.route('/allusers')
      .get(function(req,res){
        models.User.findAll().then(function(users){
          res.json(users);
        });
      });

  // ROUTER.get('/allusers', function(req, res) {
  //   models.User.findAll({
  //   include: [ models.AccessLog ]
  //   }).then(function(users) {
  //       res.json(users);
  //   });
  // });
 // app.use('/v1', ROUTER);
//}


module.exports = ROUTER;
