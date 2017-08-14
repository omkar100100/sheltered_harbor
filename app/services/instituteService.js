var models  = require('../models');
var Promise = require('bluebird');
var ContractService=require('./contractHistoryService');
var Web3JSService=require('./web3jsService');

var InstituteService=function(){};


InstituteService.prototype.createInstitute=function(institute,app){
        var promise1 = function () {
            return new Promise(function (resolve, reject) {
                models.Institute.create(institute).then(function(institute){
                            institute1=institute;
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

    var promise2 = function () {
            return new Promise(function (resolve, reject) {
                    obj={};
                    obj.orgName=institute1.LegalName;
                    obj.orgAddress=institute1.Address;
                    obj.isAgency=true;
                    obj.signature="Test Signature";

                    var web3js=new Web3JSService();
                    web3js.saveOrganization(obj)
                    .then(function(result){
                        resolve(result);
                    });
            
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
