var ContractHistoryService=require('../services/contractHistoryService');


var ContractHistoryController = function() {
};

ContractHistoryController.prototype.updateInstituteContract = function(req, res) {
    var newContract=req.body;
    var contractHistoryService = new ContractHistoryService();
       return contractHistoryService.updateInstituteContract(newContract,req.app).then(function(result) {
        res.json(result);
    })
  
};

module.exports = new ContractHistoryController();