var models  = require('../models');
var Promise = require('bluebird');
var jQuery = require("jquery-extend");
var async=require('async');
var InstitueService=require('./instituteService');
var Moment= require('moment-timezone');

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
            order: [ [ 'UploadTimestamp', 'DESC' ]]
        }).then(function(shLog){
            return shLog;
        })
    );
}



SHLogService.prototype.saveSHLogInstitute=function(log){
    return new Promise(function(resolve,reject){    
        var file={};
        var fileParts=[];

        //var fullFileName="SH_20160620_021000021_3_10_001_00_OptionalMyStuffSuffix";
        var fullFileName=log.FileName;
   
        fileParts=fullFileName.split("_");
        console.log(fileParts);
        file.prefix=fileParts[0];
        var moment= new Moment({year: fileParts[1].substring(0,4), month: fileParts[1].substring(4,6), day: fileParts[1].substring(6,8)});
        file.fileDate=moment.format();
        file.instIdentifier=fileParts[2];
        file.instIdType=fileParts[3];
        file.fileSet=fileParts[4];
        file.version=fileParts[5];
        file.fileId=fileParts[6];
        file.seq=fileParts[7];
        var instituteService=new InstitueService();
        instituteService.getInstituteByIdentifier(file.instIdentifier).then(function(institute){
            var shLog={}
            shLog.TxHash=log.TxHash;
            shLog.Filename=fullFileName;
            shLog.Tag=log.Tag;
            shLog.AdditionalData=log.AdditionalData;
            shLog.AttestationDate=file.fileDate;
            shLog.UploadTimestamp=file.fileDate;
            shLog.Status=true;
            shLog.InstituteId=institute.id;
            if(institute.ServiceProviderId){
                shLog.ServiceProviderId=institute.ServiceProviderId;
            }else{
                shLog.ServiceProviderId=institute.id;
            }
            
    
            SHLogService.prototype.createSHLog(shLog)
            .then(function(result){
                resolve(result);
            })
            .catch(function(error){
                reject(error);
            })

      })
    })
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
                                        if(tempSHLog){
                                            obj.logId=tempSHLog.id;
                                            obj.instituteName=institute.LegalName;
                                            obj.submittedBy=institute.ServiceProviderId;
                                            obj.lastSubmittedOn=tempSHLog.UploadTimestamp;

                                            var since= new Moment(tempSHLog.AttestationDate).fromNow();
                                            obj.daysSinceLastSubmission=since;
                                            obj.instituteId=institute.id;
                                            shLogsArr.push(obj);
                                        }
                                        
                                        return shLogsArr;
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
