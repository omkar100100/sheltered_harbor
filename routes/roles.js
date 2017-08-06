var models  = require('../app/models');
var roleController = require('../app/controllers/roleController');
var express = require('express');

router=express.Router();

var app=null;

router.post('/', function(req, res) {
      roleController.createRole(req,res);
});

router.get('/', function(req, res) {
      roleController.getAllRoles(req,res);
});

router.get('/:roleId', function(req, res) {
      roleController.getRole(req,res);
});

// router.use( (req,res,next) => {
//     app = req.app;
//     next();
// });

module.exports=router;