var models  = require('../app/models');
var shLogController = require('../app/controllers/shLogController');
var express = require('express');

router=express.Router();


router.post('/', function(req, res) {
      shLogController.createSHLog(req,res);
});

// router.get('/:instituteId',function(req,res){
//       shLogController.getSHLog(req,res);
// });

router.get('/institute/',function(req,res){
      shLogController.getSHLogsForInstitutes(req,res);
});


module.exports=router;