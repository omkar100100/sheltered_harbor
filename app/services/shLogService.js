var models  = require('../models');
var Promise = require('bluebird');
var jQuery = require("jquery-extend");
var async=require('async');
var InstitueService=require('./instituteService');
var Moment= require('moment-timezone');
var Web3JSService=require('./web3jsService');
var randomstring = require("randomstring");
var errors = require('../errors');
var CONSTANTS=require('../common/constants')

var SHLogService=function(){};

SHLogService.prototype.submitSHLogOffline=function(log){
        var shLog={}
          return new Promise(function (resolve, reject) {
                    var file={};
                    var fileParts=[];
                    //var fullFileName="SH_20160620_021000021_3_10_001_00_OptionalMyStuffSuffix";
                    var fullFileName=log[PARAMETER_LABELS.SH_FILENAME];
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
                    instIdentifierObj={}
                    instIdentifierObj.IDType=CONSTANTS.getIDTypeById(fileParts[3]);
                    instIdentifierObj.Identifier=fileParts[2];
                    file.instIdentifierObj=instIdentifierObj;

                    instituteService.getInstituteByIdentifier(instIdentifierObj).then(function(institute){
                        shLog.Filename=fullFileName;
                        shLog.Tag=log[PARAMETER_LABELS.SH_TAG];
                        shLog.AdditionalData=log[PARAMETER_LABELS.SH_ADDITIONAL_DATA];
                        shLog.FileDate=file.fileDate;
                        shLog.Status=LOG_SUBMISSION_STATUS.IN_PROGRESS.label;
                        
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

            }) //Promise
};

//DIRECT CREATION OF LOG ENTRY INSIDE DATABASE
SHLogService.prototype.createSHLog=function(shLog){
   return new Promise(function(resolve,reject){
        models.SHLog.create(shLog).then(function(result){
            resolve(result)
        })
   })

}


SHLogService.prototype.deleteAll=function(app){
    var models1 = app.get('models');
   return new Promise(function(resolve,reject){
        models1.SHLog.destroy({where: {}}).then(function () {
            resolve();
        });
   });
};

SHLogService.prototype.getLatestSHLog=function(search){
    var whereClause=null;
    if(search.startDate && search.endDate){
        whereClause={
             $and :[
                        {  "InstituteId":search.instituteId },     
                        {  "updatedAt":{
                                $between: [search.startDate, search.endDate]
                            } 
                        }
                ]
        }
    }else{
        whereClause={"InstituteId":search.instituteId }
    }

    return Promise.resolve(
        models.SHLog.findAll({
            limit : 1,
            where:whereClause,
            order: [ [ 'updatedAt', 'DESC' ]]
        }).then(function(shLog){
            return shLog;
        })
    );
}

SHLogService.prototype.getSHLogByTxHash=function(tx){
    return Promise.resolve(
        models.SHLog.findAll({
            where:{"TxHash":tx }
           }).then(function(shLog){
            return shLog;
        })
    );
}




SHLogService.prototype.getLogById=function(logId){
     return Promise.resolve(
        models.SHLog.findById(logId).then(function(shLog){
            return shLog;
        })
    );
}



SHLogService.prototype.getSHLogsForInstitute=function(search){
    return Promise.resolve(
        models.SHLog.findAll({
            where:{
                $and :[
                        {  "InstituteId":search.instituteId },     
                        {  "createdAt":{
                                $between: [search.startDate, search.endDate]
                            } 
                        }
                ]
            },
            order: [ [ 'createdAt', 'DESC' ]]
        }).then(function(shLogs){
            shLogArr=[];
            shLogs.forEach(function(shLog){
                var obj={};
                obj.Filename=shLog.Filename;
                obj.DateTime=shLog.AttestationDate;
                obj.FileDate=shLog.FileDate;
                obj.Hash=shLog.TxHash;
                obj.Status=shLog.Status;
                obj.AttestationDate=shLog.AttestationDate;
                obj.submittedDate=shLog.createdAt;
                shLogArr.push(obj);
            })
            
            
            return shLogArr;
        })
    );
}



SHLogService.prototype.saveSHLogInstitute=function(log){
    var institute1=null;
    var shLog={}
    shLogResult=null;

          return new Promise(function (resolve, reject) {
                    var file={};
                    var fileParts=[];
                    //var fullFileName="SH_20160620_021000021_3_10_001_00_OptionalMyStuffSuffix";
                    var fullFileName=log[PARAMETER_LABELS.SH_FILENAME];
                    fileParts=fullFileName.split("_");
                    console.log(fileParts);
                    file.prefix=fileParts[0];
                   // var moment= new Moment({year: fileParts[1].substring(0,4), month: fileParts[1].substring(4,6), day: fileParts[1].substring(6,8)});
                    var moment= new Moment({year: fileParts[1].substring(0,4), month: Number(fileParts[1].substring(4,6))-1, day: fileParts[1].substring(6,8)});
                    file.fileDate=moment.format();


                    var now=new Moment();
                    if(!moment.endOf('day').isSameOrBefore(now.endOf('day'),'day')){
                         return reject(errors.normalizeError('LOGFILE_DATE_EXCEEDED', null, null));
                    }

                    var instIdentifierObj={};
                    instIdentifierObj.IDType=CONSTANTS.getIDTypeById(fileParts[3]);
                    instIdentifierObj.Identifier=fileParts[2];

                    file.instIdentifier=instIdentifierObj;
                    file.instIdType=fileParts[3];
                    file.fileSet=fileParts[4];
                    file.version=fileParts[5];
                    file.fileId=fileParts[6];
                    file.seq=fileParts[7];
                    var instituteService=new InstitueService();
                    instituteService.getInstituteByIdentifier(instIdentifierObj).then(function(institute){
                       if(institute.IsActive && institute.Registered){
                                institute1=institute;
                                shLog.Filename=fullFileName;
                                shLog.Tag=log[PARAMETER_LABELS.SH_TAG];
                                shLog.AdditionalData=log[PARAMETER_LABELS.SH_ADDITIONAL_DATA];
                                shLog.FileDate=file.fileDate;
                                shLog.Status=LOG_SUBMISSION_STATUS.IN_PROGRESS.label;
                                shLog.InstituteId=institute.id;
                                if(institute.ServiceProviderId){
                                    shLog.ServiceProviderId=institute.ServiceProviderId;
                                }else{
                                    shLog.ServiceProviderId=institute.id;
                                }
                                
                                //VALIDATE WHETHER TO HIT QUORUM CALL FOR ATTESTATIONS
                                //where :{ AccountAddress: log[PARAMETER_LABELS.SH_HASH] }
                               models.RegisterContract.findOne({
                                        where :{ InstituteId: institute.id }
                                }).then(function(registerContract){
                                    if(registerContract!=null){
                                                SHLogService.prototype.createSHLog(shLog).then(function(result){
                                                shLogResult=result; 

                                                //WEB3JS
                                                obj={};
                                                obj.Name=institute1.LegalName;
                                                obj[PARAMETER_LABELS.SH_TAG]=log[PARAMETER_LABELS.SH_TAG]
                                                obj[PARAMETER_LABELS.SH_HASH]=log[PARAMETER_LABELS.SH_HASH];
                                                obj[PARAMETER_LABELS.SH_FILENAME]=log[PARAMETER_LABELS.SH_FILENAME];
                                                obj[PARAMETER_LABELS.SH_ADDITIONAL_DATA]=log[PARAMETER_LABELS.SH_ADDITIONAL_DATA];
                                                obj[PARAMETER_LABELS.SH_SIGNATURE]=log[PARAMETER_LABELS.SH_SIGNATURE];
                                                obj.ContractAddress=registerContract.ContractAddress;
                                                obj.AccountAddress=registerContract.AccountAddress;
                                                var web3js=new Web3JSService();
                                                web3js.saveAttestation(obj)
                                                .then(function(result){
                                                    var now=new Moment().format();
                                                    shLogResult.TxHash=result.transactionHash;
                                                    shLogResult.Status=LOG_SUBMISSION_STATUS.SUBMITTED.label;
                                                    shLogResult.AttestationDate=now;
                                                    shLogResult.save().then(function(inst){
                                                        var finalRes={};
                                                        finalRes.message=SUCCESS_MESSAGES.ATTESTATION_SUCCESS_MESSAGE;
                                                        finalRes.quorum=result;
                                                        finalRes.logDetails=shLogResult;
                                                        resolve(finalRes);
                                                    })
                                                }).catch(function(error){
                                                    console.log("Quroum Error:" + error);
                                                    shLogResult.update(
                                                        { Status: LOG_SUBMISSION_STATUS.FAILED.label}
                                                    ).then(function(result){
                                                        return reject(error);
                                                    })
                                                    
                                                })
                                                
                                               // resolve(shLogResult);

                                            }).catch(function(error){
                                                reject(error);
                                            })
                                    }
                                });

                                

                        }else{
                            return reject(errors.normalizeError('INSTITUTE_NOT_ELIGIBLE_FOR_ATTESTATION', null, null));
                        }

                })
                .catch(function(error){
                    return reject(errors.normalizeError('LOGFILE_INSTITUTE_NOT_FOUND', null, null));
                })

            }) //Promise

      
}

SHLogService.prototype.generateSignature=function(request){
    return new Promise(function(resolve,reject){
        var web3js=new Web3JSService();
        var response=web3js.Util_SignContent_Registration(request);
        resolve(response);
        
    })
     
}


SHLogService.prototype.Util_SignContent_Attestation=function(request){
    return new Promise(function(resolve,reject){
        var web3js=new Web3JSService();
        var response=web3js.Util_SignContent_Attestation(request);
        resolve(response);
        
    })
     
}

SHLogService.prototype.getLatestSHLogsForInstitutes=function(search){
    return Promise.resolve(
            models.Institute.findAll({
                where: { IsActive : true }
            }).then(function(institutes){
                    var shLogsArr=[]
                    var fn = function generate(institute){
                                    search.instituteId=institute.id;
                                    return SHLogService.prototype.getLatestSHLog(search).then(function(shLogs){
                                        var obj={};
                                        var tempSHLog=shLogs[0];
                                        if(tempSHLog){
                                            obj.logId=tempSHLog.id;
                                            obj.instituteName=institute.LegalName;
                                            if(!institute.ServiceProviderId){
                                                obj.submittedBy=DATA_LABELS.INSTITUTION;
                                            }else{
                                                obj.submittedBy=DATA_LABELS.SERVICE_PROVIDER;
                                            }
                                            
                                            obj.lastSubmittedOn=tempSHLog.updatedAt;

                                            var since= new Moment(tempSHLog.updatedAt).fromNow();
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
