var ContractHistoryService=require('../services/contractHistoryService');
var InstituteService=require('../services/instituteService');
var response=require('../common/response');

var ContractHistoryController = function() {
};

ContractHistoryController.prototype.updateInstituteContract = function(req, res) {
    var newContract=req.body;
    var contractHistoryService = new ContractHistoryService();
    var instituteService = new InstituteService();
       return contractHistoryService.updateInstituteContract(newContract,instituteService,req.app).then(function(result) {
        response.handleSuccessResponse(200, result, res);
    })
  
};

module.exports = new ContractHistoryController();