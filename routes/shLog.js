var models  = require('../app/models');
var shLogController = require('../app/controllers/shLogController');
var express = require('express');

router=express.Router();


router.post('/', function(req, res) {
      shLogController.createSHLog(req,res);
});

router.get('/institute/:instituteId/latest',function(req,res){
      shLogController.getSHLog(req,res);
});

router.get('/institute/latest',function(req,res){
      shLogController.getSHLogsForInstitutes(req,res);
});

router.get('/institute/:instituteId',function(req,res){
      shLogController.getSHLogsByInstitute(req,res);
});


router.post('/institute/',function(req,res){
      shLogController.saveSHLogsForInstitute(req,res);
});

router.post('/institute/tx',function(req,res){
      shLogController.getSHLogByTxHash(req,res);
});


module.exports=router;