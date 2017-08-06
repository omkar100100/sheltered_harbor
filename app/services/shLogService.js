var models  = require('../models');
var Promise = require('bluebird');
var jQuery = require("jquery-extend");
var async=require('async');

var SHLogService=function(){};

SHLogService.prototype.createSHLog=function(shLog){
   return Promise.resolve(
        models.SHLog.create(shLog).then(function(shLog){
            return shLog;
        })
    );
};


SHLogService.prototype.getSHLog=function(instituteId){
    return Promise.resolve(
        models.SHLog.findAll({
            limit : 1,
            where:{"InstituteId":instituteId },
            order: [ [ 'AttestationDate', 'DESC' ]]
        }).then(function(shLog){
            return shLog;
        })
    );
}


getResuls =function(results){
    return results;
}

SHLogService.prototype.getSHLogsForInstitutes=function(){
    //http://bluebirdjs.com/docs/api/promise.join.html
    return Promise.resolve(
            models.Institute.findAll({
                where: { IsActive : true }
            }).then(function(institutes){
                    pArr=[];
                    var shLogsArr=[];
                    institutes.forEach(function(institute){
                        //    Promise p = SHLogService.prototype.getSHLog(institute.id).resolve(
                        //        Object.prototype.extend = function(obj) {
                        //             for (var i in obj) {
                        //                 if (obj.hasOwnProperty(i)) {
                        //                     this[i] = obj[i];
                        //                 }
                        //             }
                        //         };
                        //         var tempSHLog=shLogs[0];
                        //         var shLogId=tempSHLog.id;
                        //         tempSHLog.extend(institute);
                        //         tempSHLog.id=shLogId;
                        //         shLogsArr.push(tempSHLog);        
                        //    )
                        //    pArr.push(p);
                           
                    })

                         Promise.all(pArr).then(values => { 
                                console.log(values); // [3, 1337, "foo"] 
                          });




            })
    );
}


module.exports=SHLogService;
