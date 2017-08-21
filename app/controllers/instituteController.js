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
        })
  
};


InstituteController.prototype.getByIdentifier= function(req, res) {
        var identifierId=req.params.id;
        var instituteService = new InstituteService();
        instituteService.getInstituteByIdentifier(identifierId,req.app).then(function(result) {
            response.handleSuccessResponse(200, result, res);
        })
  
};

InstituteController.prototype.createInstitute = function(req, res) {
        var institute=req.body;
        var instituteService = new InstituteService();
        var contractService=new ContractService();
        instituteService.createInstitute(institute,contractService,req.app)
        .then(function(institute){
            response.handleSuccessResponse(200, institute, res);
        })
        .catch(function(error){
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
        })
};

InstituteController.prototype.getAllInstitutes= function(req, res) {
        var instituteService = new InstituteService();
        instituteService.getAllInstitutes().then(function(result) {
           response.handleSuccessResponse(200, result, res);
        })
  
};

InstituteController.prototype.updateActiveStatus= function(req, res) {
        var instituteService = new InstituteService();
        var identifier=req.params.identifier;
        instituteService.updateActiveStatus(identifier,req.app).then(function(result) {
           response.handleSuccessResponse(200, result, res);
        })
  
};





module.exports = new InstituteController();