var models  = require('../models');
var Promise = require('bluebird');
var Sequelize = require('sequelize');
var InstitueService=require('./instituteService');


ContractHistoryService=function(){}


ContractHistoryService.prototype.logContractHistory=function(contract,app){
    var models1 = app.get('models');
        return new Promise(function(resolve,reject){
            models1.InstituteHistory.create(contract)
            .then(function(contract){
                   resolve(contract);
            })
        })
};


ContractHistoryService.prototype.getInstituteLatestContract=function(instituteId,app){
    var models1 = app.get('models');
        return new Promise(function(resolve,reject){
            models1.InstituteHistory.findAll({
                limit : 1,
                where:{"InstituteId":instituteId },
                order: [ [ 'RenewalDateTo', 'DESC' ]]
            })
            .then(function(instContract){
                   resolve(instContract[0]);
            })
        })
};


ContractHistoryService.prototype.updateInstituteContract=function(contract,instituteService,app){
        var models1 = app.get('models');
        
        return new Promise(function(resolve,reject){
            
             ContractHistoryService.prototype.getInstituteLatestContract(contract.InstituteId,app)
            .then(function(instContract){
                        var model={};
                        model.InstituteId=contract.InstituteId;
                        model.RenewalDateFrom=contract.RenewalDateFrom;
                        model.RenewalDateTo=contract.RenewalDateTo;
                        model.OldFromDate=instContract.getDataValue('RenewalDateFrom');
                        model.OldToDate=instContract.getDataValue('RenewalDateTo');
                        model.Note=contract.Note;
                    
                    var InstituteHistory=models1.InstituteHistory.build(model);

                    InstituteHistory.save()
                    .then(function(newContract){
                         newContract={};
                         newContract.InstituteId=instContract.InstituteId;
                         newContract.ContractFrom=contract.RenewalDateFrom;
                         newContract.ContractTo=contract.RenewalDateTo;
                         instituteService.updateContract(newContract,app)
                         .then(function(result){
                             resolve(newContract);
                         })
                        
                    })
            })

        })
};






module.exports=ContractHistoryService;


