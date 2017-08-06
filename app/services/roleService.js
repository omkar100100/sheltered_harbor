// const cls = require('continuation-local-storage'),
//  namespace = cls.createNamespace('my-very-own-namespace');
var models  = require('../models');
var Promise = require('bluebird');
// var Sequelize = require('sequelize');
// Sequelize.useCLS(namespace);



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
  //   models1.sequelize.transaction(function (t1) {
        return Promise.resolve(function(){
            //var role1=models1.Role.build(role);
           models.Role.create(role)
           .then(function(role){
                console.log(role);
                return role;
            });
        });
  // });

};


RoleService.prototype.getAllRoles=function(){
    return Promise.resolve(
        models.Role.findAll().then(function(roles){
            return roles;
        })
    )
};

// RoleService.prototype.removeRole=function(role){
//     return Promise.resolve(
//         models.Role.destroy.on('success',function(u){
//             if(u && u.deletedAt){
//                 console.log("Role wit id:" + role.id + " deleted");
//             }
//         });
//     )
// };


module.exports=RoleService;


