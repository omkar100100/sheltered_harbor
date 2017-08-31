var models  = require('../models');
var Promise = require('bluebird');
var ContractService=require('./contractHistoryService');
var Web3JSService=require('./web3jsService');
var randomstring = require("randomstring");
var md5 = require('md5');
const util = require('ethereumjs-util');
var errors = require('../errors');
var SequelizeUniqueConstraintError = require("sequelize").ValidationError;
var SequelizeForeignKeyConstraintError = require("sequelize").ForeignKeyConstraintError;
var CONSTANTS=require('../common/constants')
var MAIL_TEMPLATES=require('../common/mail/mailtemplates')
var env=require('../../environment')
var EmailTemplate = require('email-templates').EmailTemplate;

var InstituteService=function(){};

InstituteService.prototype.findInstituteByHash=function(hash,app){
        
            return new Promise(function (resolve, reject) {
                var models1 = app.get('models');
                models.Institute.findOne({
                    where : {  Hash: hash}
                })
                .then(function(institute){
                    resolve(institute);
                })
            })
        
}


InstituteService.prototype.getSHLogs=function(search){
     return new Promise(function(resolve,reject){
            models.Institute.findAll({
                where: { "IsActive": true },
                include: [{ model: models.SHLog, 
                                where:{
                                         "createdAt":{
                                                $between: [search.startDate, search.endDate]
                                            } 
                                },order: [ [ 'createdAt', 'DESC' ]]
                        }]
            }).then(function(logs){
                resolve(logs);
            })
     })
}

InstituteService.prototype.createInstitute=function(institute,contractService,app){
         var createParticipantNContract = function(){
           return  new Promise(function (resolve, reject) {
                var rndString=randomstring.generate();
                var hash=md5(rndString);
                institute.Hash=hash;
                institute.IdType=CONSTANTS.getIDTypeById(institute.IdType);
                models.Institute.create(institute)
                .then(function(institute){
                        //from: 'shelteredharbour@gmail.com'

                        //  MAIL_TEMPLATES.ON_BOARD_TEMPLATE.to=institute.ContactEmail;
                        //  MAIL_TEMPLATES.ON_BOARD_TEMPLATE.html=MAIL_TEMPLATES.ON_BOARD_TEMPLATE.html.replace(new RegExp('<%PARTICIPANT_REG_KEY%>', 'g'),institute.Hash);
                        //  MAIL_TEMPLATES.ON_BOARD_TEMPLATE.html=MAIL_TEMPLATES.ON_BOARD_TEMPLATE.html.replace(new RegExp('<%PARTICIPANT_NAME%>', 'g'),institute.LegalName);
                        //  env.getMailTransporter().sendMail(MAIL_TEMPLATES.ON_BOARD_TEMPLATE, (error, info) => {
                        //     if (error) {
                        //         return console.log(error);
                        //     }
                        //     console.log('Message %s sent: %s', info.messageId, info.response);
                        // });

                        // var regKeySender=env.getMailTransporter().templateSender(new EmailTemplate('app/common/mail/templates'), {
                        //     from: 'avula.chandrasekhar@gmail.com',
                        //     attachments:[{ 
                        //                         filename: 'UX.pdf',
                        //                         path: 'app/common/mail/attachments/UX.pdf' 
                        //                 }]
                        // });

                        var regKeySender=env.getMailTransporter().templateSender({
                           html:   "<table class='main'>"+
                                    "<tr>"+
                                        "<td class='wrapper'>"+
                                        "<table >"+
                                            "<tr>"+
                                            "<td>"+
                                                "<p><b>{{ participantName }}</b></p>"+
                                                "<p>Welcome to Sheltered Harbor, we have successfully introduced <b> {{ participantName }}</b> into our Sheltered Harbor monitoring log distributed ledger. Please verify your details below, and use the included registration key to complete the on-borading process as described in the attached 'On-Boarding Procedure' pdf.</p>"+
                                                "<p>Details:</p>"+
                                                "<p>Registration key for On-Boarding:  <b>{{ registrationKey }}</p>"+
                                                "<p>Thank you for choosing to be a part of the Sheltered Harbor community.</p>"+
                                            "</td>"+
                                            "</tr>"+
                                        "</table>"+
                                        "</td>"+
                                    "</tr>"+
                                    "</table>"
                        },
                         {   from: 'avula.chandrasekhar@gmail.com',
                            attachments:[{ 
                                                filename: 'UX.pdf',
                                                path: 'app/common/mail/attachments/UX.pdf' 
                                        }]                                    
                            
                        });


                        regKeySender({
                            to: institute.ContactEmail,
                            subject: 'Registration Key'
                        }, {
                            participantName: institute.LegalName,
                            registrationKey: institute.Hash
                        }, function(err, info){
                            if(err){
                                 console.log('Error');
                            }else{
                                console.log('Registration Key is  sent');
                            }
                        });

                        var contractService=new ContractService();
                        var contract={};
                        contract.InstituteId=institute.id;
                        contract.RenewalDateFrom=institute.ContractFrom;
                        contract.RenewalDateTo=institute.ContractTo;
                        contract.OldFromDate=null;
                        contract.OldToDate=null;
                        contract.Note=null;            
                        contractService.logContractHistory(contract,app)
                        .then(function(contractHistory){
                            resolve(institute);
                        })
                      
                
                })
                .catch(function(error){
                    if(error instanceof  SequelizeUniqueConstraintError){
                        return reject(errors.normalizeError('UNIQUE_CONSTRAINT_FAILED', error, null));
                    }else if(error instanceof  SequelizeForeignKeyConstraintError){
                        return reject(errors.normalizeError('FOREIGN_KEY_CONSTRAINT_FAILED', error, null));
                    }else{
                        console.log("Error:" + error);
                        return reject(errors.normalizeError(null, error, null));
                    }
                })

            })
         } 

  
        return Promise.map([createParticipantNContract], function (createParticipantNContract) {
            return createParticipantNContract();
        }, {concurrency: 1}); 



};

InstituteService.prototype.register=function(institute,app){
        var models=app.get("models");
        var promise1 = function () {
            return new Promise(function (resolve, reject) {
                    InstituteService.prototype.findInstituteByHash(institute[PARAMETER_LABELS.SH_REGISTRATION_KEY],app)
                    .then(function(institute1){
                        if(institute1){
                            if(institute1.Registered){
                                return reject(errors.normalizeError('ALREADY_REGISTERED', null,null));
                            }else{
                                obj={};
                                obj.orgName=institute1.LegalName;
                                obj.orgAddress=institute1.Address;
                                obj.RegKey=institute1.Hash;
                                if(institute1.Type==DATA_LABELS.SERVICE_PROVIDER){
                                    obj.isAgency=true;    
                                }else{
                                    obj.isAgency=false; 
                                }
                                obj.ethereumAddress=institute[PARAMETER_LABELS.SH_PUBLIC_KEY];
                                obj.signature=institute[PARAMETER_LABELS.SH_SIGNATURE];

                               
                                //WEB3JS CODE
                                var web3js=new Web3JSService();
                                web3js.saveOrganization(obj)
                                .then(function(result){
                                    result.InstituteId=institute1.id;
                                    models.RegisterContract.create(result)
                                    .then(function(registerContractRes){
                                             var response={};
                                            response['SH-Status']="FI/SP is registered successfully. Please use the same public/private key for attestation.";
                                            response['SH-StatusMessage']="On Boarding Created";
                                            institute1.updateAttributes({Registered:true , RegisteredDate: models.sequelize.literal('CURRENT_TIMESTAMP')})
                                            .then(function(inst){
                                                resolve(response);
                                            })
                                    })
                                    
                                })
                                .catch(function(error){
                                    console.log(error);
                                    reject(error);
                                })
                            }
                            
                        }else{
                            return reject(errors.normalizeError('INVALID_REGISTRATION_KEY', null, null));
                        }
                       
                    })
                    .catch(function(error){
                        reject(error);
                    })
            })
        };

         return Promise.map([promise1], function (promiseFn) {
            return promiseFn();
        }, {concurrency: 1}); 
        
}

InstituteService.prototype.getById=function(id,app){
    var models1 = app.get('models');
    return Promise.resolve(
        models1.Institute.findOne({
            where: { 
                IsActive: true ,
                id: id
            }
        }).then(function(institute1){
             return institute1;
        })
    )
}

InstituteService.prototype.updateInstitute=function(institute,app){
   return Promise.resolve(
        this.getById(institute.id,app)
        .then(function(inst){

                var obj={};
                obj.Address=institute.Address,
                obj.ContractState=institute.ContractState,
                obj.ContactName=institute.ContactName,
                obj.ContactEmail=institute.ContactEmail,
                obj.ContactPhone=institute.ContactPhone,
                obj.LegalName=institute.LegalName,
                obj.PhoneNumber=institute.PhoneNumber,
                obj.Type=institute.Type,
                obj.Identifier=institute.Identifier,
                obj.ServiceProviderId=institute.ServiceProviderId,
                obj.IdType=institute.IdType,
                obj.NodeId=institute.NodeId
            
            return inst.update(obj)
            .then(function(updatedInst){
                return updatedInst;
            })
        })
    );
};


InstituteService.prototype.updateContract=function(newContract,app){
    var models1 = app.get('models');
   return new Promise(function(resolve,reject){
         InstituteService.prototype.getById(newContract.InstituteId,app)
        .then(function(institute){
                institute.ContractFrom=newContract.ContractFrom
                institute.ContractTo=newContract.ContractTo;
                institute.save()
                .then(function(updatedInstitute){
                    resolve();
                })
        })
   });

};



InstituteService.prototype.deleteAllNodes=function(app){
   var models1 = app.get('models');
   return new Promise(function(resolve,reject){
        models1.Institute.destroy({where: {}}).then(function () {
            resolve();
        }).catch(function(error){
            reject(error);
        })
   });

};

InstituteService.prototype.getAllParticipants=function(){
    return Promise.resolve(
        models.Institute.findAll({
            where: { 
                $and:[
                    {"IsActive":true }
                ]
             }
        }).then(function(institutes){
            return institutes;
        })
    )
};


InstituteService.prototype.getInstituteByIdentifier=function(identifierObj){
    return Promise.resolve(
        models.Institute.findOne({
            where: {
                $and:[
                    { Identifier: identifierObj.Identifier },
                    { IdType: identifierObj.IDType }
                ] 
            }
        }).then(function(institute){
            return institute;
        })
    )
};

InstituteService.prototype.updateActiveStatus=function(id,app){
    var models1 = app.get('models');

    return new Promise(function(resolve,reject){
        models1.Institute.findById(id).then(function(institute){
             institute.IsActive=!institute.IsActive;
             institute.save().then(function(result){
                 resolve(result);
             })
        })
    })
};



module.exports=InstituteService;
