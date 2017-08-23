var Promise = require('bluebird');
var CONSTANTS=require('../common/constants')
MasterService=function(){}

MasterService.prototype.getIdentifierTypes=function(){
    return new Promise(function(resolve,reject){
        resolve(ID_TYPES);
    })
}


MasterService.prototype.getDistinctServiceProviders=function(app){
    return new Promise(function(resolve,reject){
        var models = app.get('models');
        models.Institute.findAll({
            distinct: 'LegalName',
            where :{
                $and:[
                    {Type:'SP'}
                ]
                
            }
        })
        .then(function(sps){
            spArr=[];
            sps.forEach(function(sp){
              obj={};
               obj.LegalName=sp.LegalName;
               obj.id=sp.id;
               obj.Identifier=sp.Identifier;
               obj.active=sp.IsActive;
               spArr.push(obj);
           })

            resolve(spArr);  
        })
    })
    
}


MasterService.prototype.getOnBoardedInstitutes=function(app){
    var models=app.get("models");
    return new Promise(function(resolve,reject){
        models.Institute.findAll({
            attributes: ['id','LegalName','ServiceProviderId','IsActive','Registered','Hash'],
            where: {
                    $and :[
                        {Type:'FI' }
                    ]
                }
            })
            .then(function(results){
                resolve(results);
            }) 
    })
     
}



module.exports=MasterService;
