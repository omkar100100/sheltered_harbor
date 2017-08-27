var InstituteService=require('../services/instituteService');
var ContractService=require('../services/contractHistoryService');
var response=require('../common/response');

var InstituteController = function() {
};

InstituteController.prototype.getInstitute = function(req, res) {
        var participantId=req.params.participantId;
        var instituteService = new InstituteService();
        instituteService.getById(participantId,req.app).then(function(result) {
            response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};


InstituteController.prototype.getByIdentifier= function(req, res) {
        var identifierObj=req.body;
        var instituteService = new InstituteService();
        instituteService.getInstituteByIdentifier(identifierObj,req.app).then(function(result) {
            response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

InstituteController.prototype.createInstitute = function(req, res) {
        var institute=req.body;
        var instituteService = new InstituteService();
        var contractService=new ContractService();
        instituteService.createInstitute(institute,contractService,req.app)
        .then(function(institute){
            response.handleSuccessResponse(200, institute, res);
        }).catch(function(error){
               response.handleError(error, res);
        })
};



InstituteController.prototype.deleteAll = function(req, res) {
        var instituteService = new InstituteService();
        instituteService.deleteAllNodes(req.app)
        .then(function(result){
            response.handleSuccessResponse(200, result, res);
        })
        .catch(function(error){
               response.handleError(error, res);
        })
};



InstituteController.prototype.register = function(req, res) {
        var institute=req.body;
        var instituteService = new InstituteService();
        instituteService.register(institute,req.app).then(function(institute){
                response.handleSuccessResponse(200, institute, res);
        })
        .catch(function(error){
                response.handleError(error, res); 
        })
};


InstituteController.prototype.updateInstitute = function(req, res) {
        var institute=req.body;
        var instituteService = new InstituteService();
        instituteService.updateInstitute(institute,req.app).then(function(institute){
            response.handleSuccessResponse(200, institute, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
};

InstituteController.prototype.getAllParticipants= function(req, res) {
        var instituteService = new InstituteService();
        instituteService.getAllParticipants().then(function(result) {
           response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

InstituteController.prototype.updateActiveStatus= function(req, res) {
        var instituteService = new InstituteService();
        var id=req.params.id;
        instituteService.updateActiveStatus(id,req.app).then(function(result) {
           response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

InstituteController.prototype.getSHLogs = function(req, res) {
        var search=req.body;
        var instituteService = new InstituteService();
        instituteService.getSHLogs(search).then(function(shLogs) {
            response.handleSuccessResponse(200, shLogs, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};



module.exports = new InstituteController();