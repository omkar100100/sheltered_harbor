var SHLogService=require('../services/shLogService');
var response=require('../common/response');

var SHLogController = function() {
};



SHLogController.prototype.submitSHLogOffline = function(req, res) {
        var shLogRequest=req.body;
        var sHLogService = new SHLogService();
        sHLogService.submitSHLogOffline(shLogRequest).then(function(shLog){
           response.handleSuccessResponse(200, shLog, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
};


SHLogController.prototype.getLatestSHLog = function(req, res) {
        var instituteId=req.params.instituteId;
        var sHLogService = new SHLogService();
        sHLogService.getLatestSHLog(instituteId).then(function(shLog) {
           response.handleSuccessResponse(200, shLog, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};


SHLogController.prototype.deleteAll = function(req, res) {
        var sHLogService = new SHLogService();
        sHLogService.deleteAll(req.app).then(function(result) {
           response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

SHLogController.prototype.getSHLogsByInstituteId = function(req, res) {
        instituteId=req.params.instituteId;
        var search=req.body;
        search.instituteId=instituteId;
        var sHLogService = new SHLogService();
        sHLogService.getSHLogsForInstitute(search).then(function(shLogs) {
            response.handleSuccessResponse(200, shLogs, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

SHLogController.prototype.downloadSHLogReportByInstituteSearchCriteria = function(req, res) {
        instituteId=req.params.instituteId;
        var search=req.body;
        search.instituteId=instituteId;
        var sHLogService = new SHLogService();
        sHLogService.downloadSHLogReportByInstituteSearchCriteria(search).then(function(result) {
          // response.handleSuccessResponse(200, shLogs, res);
           res.download(result.filename);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

SHLogController.prototype.getSHLogByTxHash = function(req, res) {
        var tx=req.params.tx;
        var sHLogService = new SHLogService();
        sHLogService.getSHLogByTxHash(tx).then(function(shLog) {
            response.handleSuccessResponse(200, shLog, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};


SHLogController.prototype.submitSHLogsForInstitute= function(req, res) {
        var sHLogService = new SHLogService();
        var log=req.body;
       sHLogService.saveSHLogInstitute(log,req.app)
        .then(function(shLog) {
            response.handleSuccessResponse(200, shLog, res);
        })
        .catch(function(error){
             response.handleError(error, res);    
        })
};

SHLogController.prototype.getLatestSHLogsForInstitutes = function(req, res) {
        var sHLogService = new SHLogService();
        search=req.body;
       sHLogService.getLatestSHLogsForInstitutes(search)
        .then(function(shLogs) {
            response.handleSuccessResponse(200, shLogs, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
};


SHLogController.prototype.generateSignature = function(req, res) {
        request=req.body;
        var sHLogService = new SHLogService();
        sHLogService.generateSignature(request)
        .then(function(result) {
            response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
};


SHLogController.prototype.UtilSignContentAttestation = function(req, res) {
        request=req.body;
        var sHLogService = new SHLogService();
        sHLogService.Util_SignContent_Attestation(request)
        .then(function(result) {
            response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
};



SHLogController.prototype.getLogById= function(req, res) {
        var sHLogService = new SHLogService();
        var logId=req.params.logId;
       sHLogService.getLogById(logId)
        .then(function(shLog) {
            response.handleSuccessResponse(200, shLog, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
};

SHLogController.prototype.notifyInstituteForSHLog= function(req, res) {
        var sHLogService = new SHLogService();
        sHLogService.notifyInstituteForSHLog(req.body,req.app)
        .then(function(result) {
            response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
};


module.exports = new SHLogController();