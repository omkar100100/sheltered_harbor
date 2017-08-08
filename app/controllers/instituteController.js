var InstituteService=require('../services/instituteService');


var InstituteController = function() {
};

InstituteController.prototype.getInstitute = function(req, res) {
        var instituteId=req.params.instituteId;
        var instituteService = new InstituteService();
        instituteService.getInstitute(instituteId).then(function(result) {
            return  res.json(result);
        })
  
};

InstituteController.prototype.createInstitute = function(req, res) {
        var institute=req.body;
        var instituteService = new InstituteService();
        instituteService.createInstitute(institute,req.app).then(function(institute){
            return res.json(institute);
        })
};

InstituteController.prototype.getAllInstitutes= function(req, res) {
        var instituteService = new InstituteService();
        instituteService.getAllInstitutes().then(function(result) {
           return res.json(result);
        })
  
};




module.exports = new InstituteController();