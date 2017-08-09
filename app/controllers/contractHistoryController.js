var ContractHistoryService=require('../services/contractHistoryService');
var response=require('../common/response');

var ContractHistoryController = function() {
};

ContractHistoryController.prototype.updateInstituteContract = function(req, res) {
    var newContract=req.body;
    var contractHistoryService = new ContractHistoryService();
       return contractHistoryService.updateInstituteContract(newContract,req.app).then(function(result) {
        response.handleSuccessResponse(200, result, res);
    })
  
};

module.exports = new ContractHistoryController();