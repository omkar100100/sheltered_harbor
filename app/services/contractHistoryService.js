var models  = require('../models');
var Promise = require('bluebird');
var Sequelize = require('sequelize');
var InstitueService=require('./instituteService');


ContractHistoryService=function(){
    console.log("Constructor");
}


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
                   resolve(instContract);
            })
        })
};


ContractHistoryService.prototype.updateInstituteContract=function(contract,app){
        var models1 = app.get('models');
        
        //TODO:FIXME - InstitueService IS NOT A CONSTRUCTOR
        instituteService=new InstitueService();
        return new Promise(function(resolve,reject){
            
            ContractHistoryService.prototype.getInstituteLatestContract(contract.instituteId,app)
            .then(function(instContract){
                        var model={};
                        model.InstituteId=contract.instituteId;
                      
                        model.RenewalDateFrom=contract.RenewalDateFrom;
                        model.RenewalDateTo=contract.RenewalDateTo;
                        model.OldFromDate=instContract[0].getDataValue('RenewalDateFrom');
                        model.OldToDate=instContract[0].getDataValue('RenewalDateTo');
                        model.Note=contract.Note;
                    
                    var InstituteHistory=models1.InstituteHistory.build(model);

                    InstituteHistory.save()
                    .then(function(newContract){
                         //Update contract details in the main table
                        
                         newContract={};
                         newContract.institueIdentifier=instContract.Identifier;
                         newContract.ContractFrom=instContract.ContractFrom;
                         newContract.ContractTo=instContract.ContractTo;
                         instituteService.updateContract(newContract)
                         .then(function(institute){
                            console.log("hello")
                         })
                         resolve(newContract);
                    })
            })

        })
};






module.exports=ContractHistoryService;


