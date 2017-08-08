var models  = require('../models');
var Promise = require('bluebird');

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

InstituteService.prototype.createInstitute=function(institute){
   return Promise.resolve(
        models.Institute.create(institute).then(function(institute){
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
