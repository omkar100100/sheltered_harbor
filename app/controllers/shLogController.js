var SHLogService=require('../services/shLogService');
var response=require('../common/response');

var SHLogController = function() {
};



SHLogController.prototype.createSHLog = function(req, res) {
        var shLog=req.body;
        var sHLogService = new SHLogService();
        sHLogService.createSHLog(shLog).then(function(shLog){
           response.handleSuccessResponse(200, shLog, res);
        })
};


SHLogController.prototype.getSHLog = function(req, res) {
        var instituteId=req.params.instituteId;
        var sHLogService = new SHLogService();
        sHLogService.getSHLog(instituteId).then(function(shLog) {
           response.handleSuccessResponse(200, shLog, res);
        })
  
};

SHLogController.prototype.getSHLogsByInstitute = function(req, res) {
        var search=req.body;
        var sHLogService = new SHLogService();
        sHLogService.getSHLogs(search).then(function(shLogs) {
            response.handleSuccessResponse(200, shLogs, res);
        })
  
};

SHLogController.prototype.getSHLogByTxHash = function(req, res) {
        var request=req.body;
        var sHLogService = new SHLogService();
        sHLogService.getSHLogByTxHash(request).then(function(shLog) {
            response.handleSuccessResponse(200, shLog, res);
        })
  
};


SHLogController.prototype.saveSHLogsForInstitute= function(req, res) {
        var sHLogService = new SHLogService();
        var log=req.body;
       sHLogService.saveSHLogInstitute(log)
        .then(function(shLog) {
            response.handleSuccessResponse(200, shLog, res);
        })
};

SHLogController.prototype.getSHLogsForInstitutes = function(req, res) {
        var sHLogService = new SHLogService();
       sHLogService.getSHLogsForInstitutes()
        .then(function(shLogs) {
            response.handleSuccessResponse(200, shLogs, res);
        })
};

module.exports = new SHLogController();