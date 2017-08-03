var AttestationService=require('../services/attestationService');


var AttestationController = function() {
};

AttestationController.prototype.getSHLogs = function(req, res) {
    var attestationService = new AttestationService();
       return attestationService.getSHLogs().then(function(result) {
        res.json(result);
    })
  
};

module.exports = new AttestationController();