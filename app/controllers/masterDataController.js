MasterService=require('../services/masterService')
var response=require('../common/response');

MasterDataController=function(){}


MasterDataController.prototype.getIdentifierTypes=function(req,res){
    masterService=new MasterService();
    masterService.getIdentifierTypes()
    .then(function(result){
        response.handleSuccessResponse(200, result, res);
    }).catch(function(error){
        response.handleError(error, res); 
    })
}


MasterDataController.prototype.getDistinctServiceProviders=function(req,res){
    masterService=new MasterService();
    masterService.getDistinctServiceProviders(req.app)
    .then(function(result){
        response.handleSuccessResponse(200, result, res);
    }).catch(function(error){
        response.handleError(error, res); 
    })
}

MasterDataController.prototype.getOnBoardedInstitutes=function(req,res){
    masterService=new MasterService();
    masterService.getOnBoardedInstitutes(req.app)
    .then(function(result){
        response.handleSuccessResponse(200, result, res);
    }).catch(function(error){
        response.handleError(error, res); 
    })
}




module.exports=new MasterDataController();