var models  = require('../models');
var Promise = require('bluebird');
var ContractService=require('./contractHistoryService');

var InstituteService=function(){};


// InstituteService.prototype.getInstitute=function(instituteId){
//     return Promise.resolve(
//         models.Institute.findById(instituteId).then(function(institutes){
//             var instituteArr=[];
//             institutes.forEach(institute){
//                 var obj={};
//                 obj.name=institute.LegalName;
//                 obj.type=institute.Type;
//                 obj.uniqueId=institute.UniqueId;
//                 obj.contractEndDate=institute.ContractTo
//                 instituteArr.push(obj);
//             }
//             return institute;
//         })
//     );
// }

// //TODO: UPDATE CONTRACT
// InstituteService.prototype.updateContract=function(instituteId){
   
// }

// //TODO: TOGGLE STATUS
// InstituteService.prototype.toggleStatus=function(instituteId){
   
// }

InstituteService.prototype.createInstitute=function(institute,app){
   return Promise.resolve(
        models.Institute.create(institute).then(function(institute){
            var contractService=new ContractService();
            var contract={};
            contract.InstituteId=institute.id;
            contract.RenewalDateFrom=institute.ContractFrom;
            contract.RenewalDateTo=institute.ContractTo;
            //TODO: calculate if old contract exists
            contract.OldFromDate=null;
            contract.OldToDate=null;
            contract.Note=null;
            contractService.logContractHistory(contract,app);
            return institute;
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


module.exports=InstituteService;
