var models  = require('../models');
var Promise = require('bluebird');
var jQuery = require("jquery-extend");
var async=require('async');
var InstitueService=require('./instituteService');
var Moment= require('moment-timezone');
var Web3JSService=require('./web3jsService');

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

SHLogService.prototype.getSHLogByTxHash=function(request){
    return Promise.resolve(
        models.SHLog.findAll({
            where:{"TxHash":request.TxHash }
           }).then(function(shLog){
            return shLog;
        })
    );
}

SHLogService.prototype.getSHLogs=function(instituteId){
    return Promise.resolve(
        models.SHLog.findAll({
            where:{"InstituteId":instituteId },
            order: [ [ 'UploadTimestamp', 'DESC' ]]
        }).then(function(shLogs){
            shLogArr=[];
            shLogs.forEach(function(shLog){
                var obj={};
                obj.Filename=shLog.Filename;
                obj.DateTime=shLog.AttestationDate;
                obj.FileDate=shLog.UploadTimestamp;
                obj.Hash=shLog.TxHash;
                shLogArr.push(obj);
            })
            
            return shLogArr;
        })
    );
}



SHLogService.prototype.saveSHLogInstitute=function(log){
   // var models1 = app.get('models');

    var institute1=null;
    var shLog={}
    shLogResult=null;

     var promise1 = function () {
          return new Promise(function (resolve, reject) {
                    var file={};
                    var fileParts=[];
                    //var fullFileName="SH_20160620_021000021_3_10_001_00_OptionalMyStuffSuffix";


                    var fullFileName=log['SH-filename'];

                    //TODO: 
                    //log['SH-hash']]
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
                        institute1=institute;
                        
                        //TODO:
                        //shLog.TxHash=
                        //log['SH-Signature']

                        shLog.Filename=fullFileName;
                        shLog.Tag=log['SH-tag'];
                        shLog.AdditionalData=log['SH-additional-data'];
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
                            shLogResult=result;                            
                            resolve(result);
                        })
                        .catch(function(error){
                            reject(error);
                        })

                     

                })

            }) //Promise
        };// Promise function 

        
         var promise2 = function () {
            return new Promise(function (resolve, reject) {
                        obj={};
                        obj.Name=institute1.LegalName;
                        obj.Tag=log['SH-tag']
                        obj.Hash=log['SH-hash'];
                        obj.FileName=log['SH-filename'];
                        obj.AdditionalData=log['SH-additional-data'];
                        obj.Signature=log['SH-Signature'];

                        var web3js=new Web3JSService();
                        web3js.saveAttestation(obj)
                        .then(function(result){
                            shLogResult.update({ TxHash : result.transactionHash})
                            .then(function(inst){
                                resolve(result);
                            })
                          
                            
                        })
            });
         };


        return Promise.map([promise1,promise2], function (promiseFn) {
            return promiseFn();
        }, {concurrency: 1}); 

      
}


SHLogService.prototype.getSHLogsForInstitutes=function(){
    return Promise.resolve(
            models.Institute.findAll({
                where: { IsActive : true }
            }).then(function(institutes){
                    var shLogsArr=[]
                    var fn = function generate(institute){
                                    return SHLogService.prototype.getSHLog(institute.id).then(function(shLogs){
                                        var obj={};
                                        var tempSHLog=shLogs[0];
                                        if(tempSHLog){
                                            obj.logId=tempSHLog.id;
                                            obj.instituteName=institute.LegalName;
                                            if(!institute.ServiceProviderId){
                                                obj.submittedBy="Institution"
                                            }else{
                                                obj.submittedBy="Service Provider"
                                            }
                                            
                                            obj.lastSubmittedOn=tempSHLog.UploadTimestamp;

                                            var since= new Moment(tempSHLog.AttestationDate).fromNow();
                                            obj.daysSinceLastSubmission=since;
                                            obj.instituteId=institute.id;

                                            var more={};
                                            more.Filename=tempSHLog.Filename;
                                            more.Tag=tempSHLog.Tag;
                                            more.Hash=tempSHLog.TxHash;
                                            more.AdditionalData=tempSHLog.AdditionalData;
                                            obj.more=more;
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
