var models  = require('../models');
var Promise = require('bluebird');
var ContractService=require('./contractHistoryService');
var Web3JSService=require('./web3jsService');
var randomstring = require("randomstring");
var md5 = require('md5');

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

InstituteService.prototype.createInstitute=function(institute,app){
        var promise1 = function () {
            return new Promise(function (resolve, reject) {
                var rndString=randomstring.generate();
                var hash=md5(rndString);
                institute.Hash=hash;
                models.Institute.create(institute).then(function(institute){
                            console.log("Institute Introduced");
                            var contractService=new ContractService();
                            var contract={};
                            contract.InstituteId=institute.id;
                            contract.RenewalDateFrom=institute.ContractFrom;
                            contract.RenewalDateTo=institute.ContractTo;
                            contract.OldFromDate=null;
                            contract.OldToDate=null;
                            contract.Note=null;
                            contractService.logContractHistory(contract,app)
                            .then(function(result){
                                console.log("Institute History Entered");
                                resolve(institute);
                            })
                
                });

            })
        };

        
        return Promise.map([promise1], function (promiseFn) {
            return promiseFn();
        }, {concurrency: 1}); 

};

InstituteService.prototype.register=function(institute,app){
    // Validate reg key
    // Invoke smart contract

        var promise1 = function () {
            return new Promise(function (resolve, reject) {
                    InstituteService.prototype.findInstituteByHash(institute['SH-RegistrationKey'],app)
                    .then(function(institute1){
                        if(institute1){
                            //TODO:
                            //Check if it is already registered
                            if(institute1.Registered){
                                 throw new Error("Institute/Service Provider already Registered");
                            }else{
                                obj={};
                                obj.orgName=institute1.LegalName;
                                obj.orgAddress=institute1.Address;
                                obj.isAgency=true;
                                obj.signature=institute['SH-Signature'];

                                var web3js=new Web3JSService();
                                web3js.saveOrganization(obj)
                                .then(function(result){
                                    var response={};
                                    response['SH-Status']="FI/SP is registered successfully. Please use the same public/private key for attestation.";
                                    response['SH-StatusMessage']="On Boarding Created";
                                    response['debug']=result;

                                    //TODO: update registered flag
                                    institute1.update({Registered:true})
                                    .then(function(inst){
                                        resolve(response);
                                    })
                                    
                                
                                });
                            }
                            
                        }else{
                            throw new Error("Invalid Registration");
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

InstituteService.prototype.findById=function(id,app){
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
        InstituteService.prototype.findById(institute.id,app)
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
   return Promise.resolve(
       InstituteService.prototype.getInstituteByIdentifier(newContract.institueIdentifier,app)
       .then(function(institute){
            //TODO:
            institute.ContractFrom=newContract.ContractFrom
            institute.ContractTo=newContract.ContractTo;
            models1.Institute.update(instituteModel)
            .then(function(updatedInstitute){
                return updatedInstitute;
            })
       })
    );
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

InstituteService.prototype.updateActiveStatus=function(status,app){
    var models1 = app.get('models');

    return Promise.resolve(
        models1.Institute.findOne({
            where: { Identifier: status.identifier }
        }).then(function(institute){
             institute.IsActive=status.active;
             institute.save().then(function(result){
                 return result;
             })
        })
    )
};



module.exports=InstituteService;
