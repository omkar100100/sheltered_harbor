var models  = require('../models');
var Promise = require('bluebird');

var InstituteService=function(){};


InstituteService.prototype.getInstitute=function(instituteId){
    return Promise.resolve(
        models.Institute.findById(instituteId).then(function(institute){
            return institute;
        })
    );
}

InstituteService.prototype.createInstitute=function(institute){
   return Promise.resolve(
        models.Institute.create(institute).then(function(institute){
            return institute;
        })
    );
};


InstituteService.prototype.getAllInstitutes=function(){
    return Promise.resolve(
        models.Institute.findAll().then(function(institutes){
            return institutes;
        })
    )
};



module.exports=InstituteService;
