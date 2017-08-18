var masterDataController = require('../app/controllers/masterDataController');
var express = require('express');

router=express.Router();


router.get('/institute/idtypes',function(req,res){
    masterDataController.getIdentifierTypes(req,res)
})

router.get('/sp',function(req,res){
    masterDataController.getDistinctServiceProviders(req,res)
})


router.get('/participants',function(req,res){
    masterDataController.getParticipants(req,res)
})

module.exports=router;