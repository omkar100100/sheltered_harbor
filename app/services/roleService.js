//const cls = require('continuation-local-storage'),
//namespace = cls.createNamespace('my-very-own-namespace');
var models  = require('../models');
var Promise = require('bluebird');
var Sequelize = require('sequelize');
//Sequelize.useCLS(namespace);



RoleService=function(app){}

RoleService.prototype.getRole=function(roleId){
    return Promise.resolve(
        models.Role.findById(roleId).then(function(role){
            return role;
        })
    );
}

RoleService.prototype.createRole=function(role,app){
    var models1 = app.get('models');
    //return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
        return new Promise(function(resolve,reject){
            models1.Role.create(role)
            .then(function(role){
                   resolve(role);
            })
        })
   // })

};



RoleService.prototype.getAllRoles=function(){
    return Promise.resolve(
        models.Role.findAll().then(function(roles){
            return roles;
        })
    )
};

RoleService.prototype.removeRole=function(id){
    return Promise.resolve(
       models.Role.destroy({where :{id:id } }).then(function(){
            return ;
        })
    )
};


RoleService.prototype.updateRole=function(roleId,role){
    return new Promise(function(resolve,reject){
            models.Role.findById(roleId)
            .then(function(result){
                if(result){
                    result.update(role)
                    .then(function(updated){
                        resolve(updated)
                    })
                }
            })

    });
              
    
};


module.exports=RoleService;


