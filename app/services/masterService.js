var Promise = require('bluebird');
var models  = require('../models');

MasterService=function(){}

MasterService.prototype.getIdentifierTypes=function(){
    return new Promise(function(resolve,reject){
       models.IdType.findAll({
            attributes: {exclude: ['updatedAt','createdAt'] },
        })
        .then(function(results){
            if(results!=null){
                idTypes=[];
                results.forEach(function(item){
                    obj={};
                    obj.id=item.id;
                    obj.name=item.Name;
                    obj.value=item.Name;
                    idTypes.push(obj);
                })
                resolve(idTypes)
            }
        })
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
