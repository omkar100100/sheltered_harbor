var models  = require('../models');
var Promise = require('bluebird');
var ContractService=require('./contractHistoryService');
var Web3JSService=require('./web3jsService');
var randomstring = require("randomstring");
var md5 = require('md5');
const util = require('ethereumjs-util');
var errors = require('../errors');
var SequelizeUniqueConstraintError = require("sequelize").ValidationError;

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


InstituteService.prototype.createInstitute=function(institute,contractService,app){
         var createParticipantNContract = function(){
           return  new Promise(function (resolve, reject) {
                var rndString=randomstring.generate();
                var hash=md5(rndString);
                institute.Hash=hash;
                models.Institute.create(institute)
                .then(function(institute){
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
                    InstituteService.prototype.findInstituteByHash(institute['SH-RegistrationKey'],app)
                    .then(function(institute1){
                        if(institute1){
                            if(institute1.Registered){
                                return reject(errors.normalizeError('ALREADY_REGISTERED', null,null));
                            }else{
                                obj={};
                                obj.orgName=institute1.LegalName;
                                obj.orgAddress=institute1.Address;
                                if(institute1.Type=="SP"){
                                    obj.isAgency=true;    
                                }else{
                                    obj.isAgency=false; 
                                }
                                
                                obj.signature=institute['SH-Signature'];

                                // START OF WEBJS CODE
                                //  var msgHash = util.sha3(institute['SH-RegistrationKey']);
                                // var rpc = util.fromRpcSig(obj.signature);
                                // const pubKey  = util.ecrecover(msgHash, rpc.v, rpc.r,rpc.s);
                                // console.log('public key hex- '+util.bufferToHex(pubKey));
                                // const addrBuf = util.pubToAddress(pubKey);
                                // const addr    = util.bufferToHex(addrBuf);

                                // // addr is the one you have to check against provided public ethereum address 
                                // console.log('Actual address -'+addr);
                                // if(addr == givenuseraddr){
                                // $("#registrationresult").html('<font  color="green">Onboarding Successsful</font>');
                                // }
                                // if(addr != givenuseraddr){
                                // $("#registrationresult").html('<font  color="red">Onboarding Failed</font>');
                                // }

                                // END OF WEB3JS CODE 

                                var web3js=new Web3JSService();
                                web3js.saveOrganization(obj)
                                .then(function(result){
                                    var response={};
                                    response['SH-Status']="FI/SP is registered successfully. Please use the same public/private key for attestation.";
                                    response['SH-StatusMessage']="On Boarding Created";
                                    institute1.updateAttributes({Registered:true , RegisteredDate: models.sequelize.literal('CURRENT_TIMESTAMP')})
                                    .then(function(inst){
                                        resolve(response);
                                    })
                                })
                                .catch(function(error){
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
                obj.ContactPhone=institute.ContactPhone
            
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
        });
   });

};

InstituteService.prototype.getAllInstitutes=function(){
    return Promise.resolve(
        models.Institute.findAll({
            where: { "IsActive":true }
        }).then(function(institutes){
            return institutes;
        })
    )
};


InstituteService.prototype.getInstituteByIdentifier=function(identifier){
    return Promise.resolve(
        models.Institute.findOne({
            where: { Identifier: identifier }
        }).then(function(institute){
            return institute;
        })
    )
};

InstituteService.prototype.updateActiveStatus=function(identifier,app){
    var models1 = app.get('models');

    return new Promise(function(resolve,reject){
        models1.Institute.findOne({
            where: { Identifier: identifier }
        }).then(function(institute){
             institute.IsActive=!institute.IsActive;
             institute.save().then(function(result){
                 resolve(result);
             })
        })
    })
};



module.exports=InstituteService;
