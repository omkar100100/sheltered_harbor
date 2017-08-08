var models  = require('../models');
var Promise = require('bluebird');
var Sequelize = require('sequelize');


ContractService=function(app){

}


ContractService.prototype.logContractHistory=function(contract,app){
    var models1 = app.get('models');
        return new Promise(function(resolve,reject){
            models1.InstituteHistory.create(contract)
            .then(function(contract){
                   resolve(contract);
            })
        })
};


ContractService.prototype.getLatestInstituteContract=function(instituteId,app){
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


ContractService.prototype.updateInstituteContract=function(contract,app){
    var models1 = app.get('models');
        return new Promise(function(resolve,reject){
            ContractService.prototype.getLatestInstituteContract(contract.instituteId,app)
            .then(function(instContract){
                        var model={};
                        model.InstituteId=contract.instituteId;
                        //TODO: getDataValue not working
                       // model.OldFromDate=instContract.getDataValue('RenewalDateFrom');
                        //model.OldToDate=instContract.getDataValue('RenewalDateTo');
                        model.RenewalDateFrom=contract.RenewalDateFrom;
                        model.RenewalDateTo=contract.RenewalDateTo;
                        model.Note=contract.Note;
                    
                    var InstituteHistory=models1.InstituteHistory.build(model);

                    InstituteHistory.save()
                    .then(function(newContract){
                         resolve(newContract);
                    })
            })

        })
};






module.exports=ContractService;


