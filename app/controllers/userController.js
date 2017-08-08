var UserService=require('../services/userService');


var UserController = function() {
};


UserController.prototype.getUser = function(req, res) {
        var userId=req.params.userId;
        var userService = new UserService();
        userService.getUser(userId).then(function(result) {
            return  res.json(result);
        })
  
};

UserController.prototype.createUser = function(req, res) {
        var user=req.body;
        var userService = new UserService();
        userService.createUser(user,req.app).then(function(user){
            return res.json(user);
        })
};

UserController.prototype.getAllUsers = function(req, res) {
        var userService = new UserService();
        userService.getAllUsers().then(function(result) {
           return res.json(result);
        })
  
};

module.exports = new UserController();