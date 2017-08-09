var models  = require('../app/models');
var instituteController = require('../app/controllers/instituteController');
var contractHistoryController = require('../app/controllers/contractHistoryController');
var express = require('express');

router=express.Router();


router.post('/', function(req, res) {
      instituteController.createInstitute(req,res);
});

router.get('/', function(req, res) {
      instituteController.getAllInstitutes(req,res);
});

router.get('/:instituteId', function(req, res) {
      instituteController.getInstitute(req,res);
});

router.put('/contract', function(req, res) {
      contractHistoryController.updateInstituteContract(req,res);
});

router.put('/enable', function(req, res) {
      instituteController.updateActiveStatus(req,res);
});

module.exports=router;
