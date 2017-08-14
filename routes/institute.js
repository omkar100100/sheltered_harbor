var models  = require('../app/models');
var instituteController = require('../app/controllers/instituteController');
var contractHistoryController = require('../app/controllers/contractHistoryController');
var express = require('express');
var response=require('../common/response');

router=express.Router();


router.post('/', function(req, res) {

      if (req.method === 'OPTIONS') {
            console.log('!OPTIONS');
            var headers = {};
            // IE8 does not allow domains to be specified, just the *
            // headers["Access-Control-Allow-Origin"] = req.headers.origin;
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
            res.writeHead(200, headers);
            response.handleSuccessResponse(200, null, res);
      } else {
            instituteController.createInstitute(req,res);
      }


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

router.put('/', function(req, res) {
      instituteController.updateInstitute(req,res);
});

router.post('/register', function(req, res) {
      instituteController.register(req,res);
});

module.exports=router;
