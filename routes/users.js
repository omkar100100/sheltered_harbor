var models  = require('../app/models');
var userController = require('../app/controllers/userController');
var express = require('express');

const router=express.Router();


router.post('/', function(req, res) {
      userController.createUser(req,res);
});

router.get('/', function(req, res) {
      userController.getAllUsers(req,res);
});

router.get('/:userId', function(req, res) {
      userController.getUser(req,res);
});

module.exports=router;