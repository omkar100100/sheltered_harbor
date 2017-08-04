var models  = require('../models');
var Promise = require('bluebird');

var RoleService=function(){};


RoleService.prototype.getRole=function(roleId){
    return Promise.resolve(
        models.Role.findById(roleId).then(function(role){
            return role;
        })
    );
}

RoleService.prototype.createRole=function(role){
   return Promise.resolve(
        models.Role.create(role).then(function(role){
            return role;
        })
    );
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
