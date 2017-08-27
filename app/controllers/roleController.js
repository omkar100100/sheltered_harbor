var RoleService=require('../services/roleService');
var response=require('../common/response');


var RoleController = function() {
};

RoleController.prototype.getRole = function(req, res) {
        var roleId=req.params.roleId;
        var roleService = new RoleService();
        roleService.getRole(roleId).then(function(result) {
             response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

RoleController.prototype.createRole = function(req, res) {
        var role=req.body;
        var roleService = new RoleService();
        roleService.createRole(role,req.app)
        .then(function(p){
             response.handleSuccessResponse(200, p, res);            
        }).catch(function(error){
           response.handleError(error, res); 
        })
};



RoleController.prototype.getAllRoles = function(req, res) {

        var roleService = new RoleService();
        roleService.getAllRoles().then(function(result) {
          response.handleSuccessResponse(200, result, res);
        }).catch(function(error){
           response.handleError(error, res); 
        })
  
};

RoleController.prototype.removeRole = function(req, res) {
    var roleId=req.params.roleId;
    var roleService = new RoleService();
    return roleService.removeRole(roleId).then(function(result) {
         response.handleSuccessResponse(200, result, res);
    }).catch(function(error){
           response.handleError(error, res); 
    })
  
};

RoleController.prototype.updateRole = function(req, res) {
    var roleId=req.params.roleId;
    var role=req.body;
    var roleService = new RoleService();
    return roleService.updateRole(roleId,role).then(function(result) {
         response.handleSuccessResponse(200, result, res);
    }).catch(function(error){
           response.handleError(error, res); 
    })
  
};

module.exports = new RoleController();