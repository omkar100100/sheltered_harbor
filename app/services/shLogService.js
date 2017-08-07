var models  = require('../models');
var Promise = require('bluebird');
var jQuery = require("jquery-extend");
var async=require('async');

var SHLogService=function(){};

SHLogService.prototype.createSHLog=function(shLog){
   return Promise.resolve(
        models.SHLog.create(shLog).then(function(shLog){
            return shLog;
        })
    );
};


SHLogService.prototype.getSHLog=function(instituteId){
    return Promise.resolve(
        models.SHLog.findAll({
            limit : 1,
            where:{"InstituteId":instituteId },
            order: [ [ 'AttestationDate', 'DESC' ]]
        }).then(function(shLog){
            return shLog;
        })
    );
}


getResuls =function(results){
    return results;
}

SHLogService.prototype.getSHLogsForInstitutes=function(){
    return Promise.resolve(
            models.Institute.findAll({
                where: { IsActive : true }
            }).then(function(institutes){
                    var shLogsArr=[]
                    var fn = function asyncMultiplyBy2(institute){
                                    return SHLogService.prototype.getSHLog(institute.id).then(function(shLogs){
                                        var obj={};
                                        var tempSHLog=shLogs[0];
                                        obj.logId=tempSHLog.id;
                                        obj.instituteName=institute.LegalName;
                                        obj.submittedBy=institute.ServiceProviderId;
                                        obj.lastSubmittedOn=tempSHLog.UploadTimestamp;
                                        obj.daysSinceLastSubmission="tobeCalculated";
                                        obj.instituteId=institute.id;
                                        return shLogsArr.push(obj);
                                    })

                    };

                    var actions=institutes.map(fn);
                    var results = Promise.all(actions); 
                    return Promise.join(results,function(results){
                        return shLogsArr;
                    })
     
            })
    );
}


module.exports=SHLogService;
