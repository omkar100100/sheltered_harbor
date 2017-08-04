var models  = require('../app/models');
var instituteController = require('../app/controllers/InstituteController');
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

module.exports=router;