var UserService=require('../services/userService');


var UserController = function() {
};

UserController.prototype.getUserProfile = function(req, res) {
    var userService = new UserService();
    var userId=req.params.userId.toLowerCase();
    return userService.getProfile(userId).then(function(result) {
        res.json(result);
    })
  
};

module.exports = new UserController();