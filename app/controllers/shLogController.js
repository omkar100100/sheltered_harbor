var SHLogService=require('../services/shLogService');
var response=require('../common/response');

var SHLogController = function() {
};



SHLogController.prototype.submitSHLogOffline = function(req, res) {
        var shLogRequest=req.body;
        var sHLogService = new SHLogService();
        sHLogService.submitSHLogOffline(shLogRequest).then(function(shLog){
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


SHLogController.prototype.deleteAll = function(req, res) {
        var sHLogService = new SHLogService();
        sHLogService.deleteAll(req.app).then(function(result) {
           response.handleSuccessResponse(200, result, res);
        })
  
};

SHLogController.prototype.getSHLogsByInstitute = function(req, res) {
        instituteId=req.params.instituteId;
        var search=req.body;
        search.instituteId=instituteId;
        var sHLogService = new SHLogService();
        sHLogService.getSHLogs(search).then(function(shLogs) {
            response.handleSuccessResponse(200, shLogs, res);
        })
  
};

SHLogController.prototype.getSHLogByTxHash = function(req, res) {
        var tx=req.params.tx;
        var sHLogService = new SHLogService();
        sHLogService.getSHLogByTxHash(tx).then(function(shLog) {
            response.handleSuccessResponse(200, shLog, res);
        })
  
};


SHLogController.prototype.submitSHLogsForInstitute= function(req, res) {
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