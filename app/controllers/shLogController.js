var SHLogService=require('../services/shLogService');


var SHLogController = function() {
};



SHLogController.prototype.createSHLog = function(req, res) {
        var shLog=req.body;
        var sHLogService = new SHLogService();
        sHLogService.createSHLog(shLog).then(function(shLog){
            return res.json(shLog);
        })
};


SHLogController.prototype.getSHLog = function(req, res) {
        var instituteId=req.params.instituteId;
        var sHLogService = new SHLogService();
        sHLogService.getSHLog(instituteId).then(function(shLog) {
            return  res.json(shLog);
        })
  
};

SHLogController.prototype.getSHLogsForInstitutes = function(req, res) {
        var sHLogService = new SHLogService();
       sHLogService.getSHLogsForInstitutes()
        .then(function(shLogs) {
            return  res.json(shLogs);
        })
};

module.exports = new SHLogController();