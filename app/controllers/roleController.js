var RoleService=require('../services/roleService');
var response=require('../common/response');


var RoleController = function() {
};

RoleController.prototype.getRole = function(req, res) {
        var roleId=req.params.roleId;
        var roleService = new RoleService();
        roleService.getRole(roleId).then(function(result) {
             response.handleSuccessResponse(200, result, res);
        })
  
};

RoleController.prototype.createRole = function(req, res) {
        var role=req.body;
        var roleService = new RoleService();
        roleService.createRole(role,req.app)
        .then(function(p){
             response.handleSuccessResponse(200, p, res);            
        })
};

RoleController.prototype.getAllRoles = function(req, res) {
        var roleService = new RoleService();
        roleService.getAllRoles().then(function(result) {
          response.handleSuccessResponse(200, result, res);
        })
  
};

RoleController.prototype.removeRole = function(req, res) {
    var roleService = new RoleService();
       return roleService.removeRole().then(function(result) {
         response.handleSuccessResponse(200, result, res);
    })
  
};


module.exports = new RoleController();