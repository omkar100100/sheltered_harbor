var AttestationService=require('../services/attestationService');
var response=require('../common/response');

var AttestationController = function() {
};

AttestationController.prototype.getSHLogs = function(req, res) {
    var attestationService = new AttestationService();
       return attestationService.getSHLogs().then(function(result) {
        response.handleSuccessResponse(200, result, res);
    })
  
};

module.exports = new AttestationController();