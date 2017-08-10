var masterDataController = require('../app/controllers/masterDataController');
var express = require('express');

router=express.Router();


router.get('/institute/idtypes',function(req,res){
    masterDataController.getIdentifierTypes(req,res)
})

router.get('/sp',function(req,res){
    masterDataController.getDistinctServiceProviders(req,res)
})

module.exports=router;