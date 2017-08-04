var models  = require('../app/models');
var roleController = require('../app/controllers/roleController');
var express = require('express');

router=express.Router();


router.post('/', function(req, res) {
      roleController.createRole(req,res);
});

router.get('/', function(req, res) {
      roleController.getAllRoles(req,res);
});

router.get('/:roleId', function(req, res) {
      roleController.getRole(req,res);
});

module.exports=router;