var models  = require('../models');
var Promise = require('bluebird');
var jQuery = require("jquery-extend");
var async=require('async');
var InstituteService=require('./instituteService');
var Moment= require('moment-timezone');
var Web3JSService=require('./web3jsService');
var randomstring = require("randomstring");
var errors = require('../errors');
var CONSTANTS=require('../common/constants')
var config = require('../../config');
var currentConfig = config.getCurrentConfig();
var env=require('../../environment')
var pdf = require('html-pdf');
fs = require('fs');

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
                    var instituteService=new InstituteService();
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

SHLogService.prototype.downloadSHLogReportByInstituteSearchCriteria=function(search){
    return new Promise(function(resolve,reject){
        SHLogService.prototype.getSHLogsForInstitute(search)
        .then(function(shLogs){
            if(shLogs){
                shLogsDTO=[];
                shLogs.forEach(function(item){
                       var obj={};
                       obj["Attestation Date"]=item.submittedDate;
                       obj["File Name"]=item.Filename;
                       obj["Monitoring Log Hash"]=item.Hash;
                       shLogsDTO.push(obj); 
                })

                var tableify = require('tableify');
                var html = tableify(shLogsDTO);
                console.log(html);

                var tmp = require('tmp');
                var tmpobj = tmp.fileSync();
                console.log('File: ', tmpobj.name);
                console.log('Filedescriptor: ', tmpobj.fd);

                fs.writeFile(tmpobj.name, html, function (err) {
                    if (err) return console.log(err);

                        var htmlContent = fs.readFileSync(tmpobj.name, 'utf8');
                        config = {
                            "directory": "/tmp",       // The directory the file gets written into if not using .toFile(filename, callback). default: '/tmp' 
                            "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
                            "orientation": "portrait" ,// portrait or landscape 
                            "border": {
                                "top": "0in",            // default is 0, units: mm, cm, in, px 
                                "right": "0in",
                                "bottom": "0in",
                                "left": "0in"
                            },
                            
                            "header": {
                                "height": "0.5in",
                                "contents": '<div style="text-align: center;"><img src="./app-header.png" alt="Sheltered Harbor" /></div>'
                            },

                            "footer": {
                                "height": "0.5in",
                                "contents": {
                                "first": '<div style="text-align: center;">&copy; 2017 Sheltered Harbor. All Rights Reserved. <span style="text-align: right;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></span></div>',
                                "2": 'Second page' ,// Any page number is working. 1-based index 
                                "default": '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value 
                                "last": 'Last Page'
                                }
                            },

                            // Zooming option, can be used to scale images if `options.type` is not pdf 
                            "zoomFactor": "1", // default is 1 
                            
                            // File options 
                            "type": "pdf",             // allowed file types: png, jpeg, pdf 
                            "quality": "75"          // only used for types png & jpeg 
            
                            }

                            pdf.create(htmlContent, config).toFile('./businesscard.pdf', function(err, res) {
                                if (err) return console.log(err);

                                tmpobj.removeCallback();
                              //console.log(res); 
                                result={};
                                result.filename=res.filename;
                                resolve(result);
                            });


                });

              
            }
        })
    })
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



SHLogService.prototype.saveSHLogInstitute=function(log,app){
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
                    var instituteService=new InstituteService();
                    instituteService.getInstituteByIdentifier(instIdentifierObj).then(function(institute){
                       if(institute.IsActive && institute.Registered){

                                //SHOULD NOT BEFORE CONTRACT START DATE
                                var contractHistoryService=new ContractHistoryService();
                                contractHistoryService.getInstituteLatestContract(institute.id,app)
                                .then(function(contract){
                                    if(contract.RenewalDateFrom && !contract.OldFromDate){
                                        contractStartDateMoment=new Moment(contract.RenewalDateFrom)
                                        if(!now.endOf('day').isSameOrAfter(contractStartDateMoment.endOf('day'),'day')){
                                               return reject(errors.normalizeError('LOGFILE_ATTESTATION_BEFORE_CONTRACT', null, null));
                                        }
                                    }
                                    
                                })
                            
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


SHLogService.prototype.notifyInstituteForSHLog=function(notify,app){
    return new Promise(function(resolve,reject){
       SHLogService.prototype.getLatestSHLog(notify)
       .then(function(result){
           var obj={};
            var tempSHLog=result[0];
            if(tempSHLog){
                 instituteService=new InstituteService();
                 instituteService.getById(tempSHLog.InstituteId,app)
                 .then(function(institute){
                        obj.logId=tempSHLog.id;
                        obj.instituteName=institute.LegalName;
                        var since= new Moment(tempSHLog.updatedAt).fromNow();

                        if(!since.includes("days") && !since.includes("months")){
                            resolve("");
                        }else if(since.includes("0")){
                            resolve("");
                        }

                        obj.daysSinceLastSubmission=since;

                        var passwordCreateMailer=env.getMailTransporter().templateSender({
                                                            html:   "<table class='main'>"+
                                                                    "<tr>"+
                                                                        "<td class='wrapper'>"+
                                                                        "<table >"+
                                                                            "<tr>"+
                                                                            "<td>"+
                                                                                "<p><b>{{ legalName }}</b></p>"+
                                                                                "<p>We have observed the log attestation was pending since <b> {{ daysSince }} </b></p>"+
                                                                                "<p>Please submit them</p>" +
                                                                                "<p>Thank you for choosing to be a part of the Sheltered Harbor community.</p>"+
                                                                            "</td>"+
                                                                            "</tr>"+
                                                                        "</table>"+
                                                                        "</td>"+
                                                                    "</tr>"+
                                                                    "</table>"
                        });

                        passwordCreateMailer({
                            from: currentConfig.mail.user,
                            to: institute.ContactEmail,
                            subject: 'Reminder: Log Attestation'
                        }, {
                           legalName: obj.instituteName,
                           daysSince: obj.daysSinceLastSubmission
                        }, function(err, info){
                            if(err){
                                console.log("Email Error"+ err);
                            }else{
                                console.log('Log Attestation Reminder Mail is sent');
                                resolve("Log Attestation Reminder Mail is sent")
                            }
                        }); 
                 
                })
                 
                 
            }else{
                resolve('');
            }
       })
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
