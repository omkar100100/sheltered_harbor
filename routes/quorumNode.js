var models  = require('../app/models');
var quorumNodeController = require('../app/controllers/quorumNodeController');
var express = require('express');

router=express.Router();


router.post('/', function(req, res) {
      quorumNodeController.createNode(req,res);
});

router.get('/', function(req, res) {
      quorumNodeController.getAllNodes(req,res);
});

router.get('/:nodeId', function(req, res) {
      quorumNodeController.getNode(req,res);
});

module.exports=router;