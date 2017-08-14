var InstituteService=require('../services/instituteService');
var response=require('../common/response');

var InstituteController = function() {
};

InstituteController.prototype.getInstitute = function(req, res) {
        var instituteId=req.params.instituteId;
        var instituteService = new InstituteService();
        instituteService.getInstitute(instituteId).then(function(result) {
            response.handleSuccessResponse(200, result, res);
        })
  
};

InstituteController.prototype.createInstitute = function(req, res) {
        var institute=req.body;
         console.log("Creating Institute Introduction");
         console.log("PAYLOAD"+ JSON.stringify(req.body));
        var instituteService = new InstituteService();
        instituteService.createInstitute(institute,req.app).then(function(institute){
            response.handleSuccessResponse(200, institute, res);
        })
};


InstituteController.prototype.register = function(req, res) {
        var institute=req.body;
        var instituteService = new InstituteService();
        instituteService.register(institute,req.app).then(function(institute){
            response.handleSuccessResponse(200, institute, res);
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
        var status=req.body;
        instituteService.updateActiveStatus(status,req.app).then(function(result) {
           response.handleSuccessResponse(200, result, res);
        })
  
};





module.exports = new InstituteController();