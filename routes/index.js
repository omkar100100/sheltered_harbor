var express = require('express');
var models  = require('../app/models');
var attestationController=require('../app/controllers/attestationController');

  // ROUTER.get('/allusers', function(req, res) {
  //   models.User.findAll({
  //   include: [ models.AccessLog ]
  //   }).then(function(users) {
  //       res.json(users);
  //   });
  // });

 // app.use('/v1', ROUTER);
//}



const ROUTER=express.Router();



module.exports=ROUTER;