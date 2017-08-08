var RoleService=require('../services/roleService');


var RoleController = function() {
};

RoleController.prototype.getRole = function(req, res) {
        var roleId=req.params.roleId;
        var roleService = new RoleService();
        roleService.getRole(roleId).then(function(result) {
            return  res.json(result);
        })
  
};

RoleController.prototype.createRole = function(req, res) {
        var role=req.body;
        var roleService = new RoleService();
        roleService.createRole(role,req.app)
        .then(function(p){
             return res.json(p);
            // p.then(function(role){
            //     return res.json(role);
            // })
            
        })
};

RoleController.prototype.getAllRoles = function(req, res) {
        var roleService = new RoleService();
        roleService.getAllRoles().then(function(result) {
           return res.json(result);
        })
  
};

RoleController.prototype.removeRole = function(req, res) {
    var roleService = new RoleService();
       return roleService.removeRole().then(function(result) {
        res.json(result);
    })
  
};


module.exports = new RoleController();