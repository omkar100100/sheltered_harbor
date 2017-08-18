CONSTANTS=require('../common/constants')
var Promise = require('bluebird');

MasterService=function(){}

MasterService.prototype.getIdentifierTypes=function(){
    return new Promise(function(resolve,reject){
        resolve(CONSTANTS.IDTYPES);
    })
}


MasterService.prototype.getDistinctServiceProviders=function(app){
    return new Promise(function(resolve,reject){
        var models = app.get('models');
        models.Institute.findAll({
            distinct: 'LegalName',
            where :{
                IsActive:true,
                Type:'SP'
            }
        })
        .then(function(sps){
            spArr=[];
            sps.forEach(function(sp){
              obj={};
               obj.LegalName=sp.LegalName;
               obj.id=sp.id;
               obj.Identifier=sp.Identifier;
               spArr.push(obj);
           })

            resolve(spArr);  
        })
    })
    
}


MasterService.prototype.getParticipants=function(app){
    var models=app.get("models");
    return new Promise(function(resolve,reject){
        models.Institute.findAll({
            attributes: ['id','LegalName','ServiceProviderId'],
            where: {
                    $and :[
                        {IsActive : true },
                        {Registered : true}
                    ]
                }
            })
            .then(function(results){
                resolve(results);
            }) 
    })
     
}



module.exports=MasterService;
