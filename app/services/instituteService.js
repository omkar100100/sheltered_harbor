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
