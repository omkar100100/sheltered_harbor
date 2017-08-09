var UserService=require('../services/userService');
var response=require('../common/response');

var UserController = function() {
};


UserController.prototype.getUser = function(req, res) {
        var userId=req.params.userId;
        var userService = new UserService();
        userService.getUser(userId).then(function(result) {
            response.handleSuccessResponse(200, result, res);
        })
  
};

UserController.prototype.createUser = function(req, res) {
        var user=req.body;
        var userService = new UserService();
        userService.createUser(user,req.app).then(function(user){
            response.handleSuccessResponse(200, user, res);
        })
};

UserController.prototype.getAllUsers = function(req, res) {
        var userService = new UserService();
        userService.getAllUsers().then(function(result) {
           response.handleSuccessResponse(200, result, res);
        })
  
};

module.exports = new UserController();