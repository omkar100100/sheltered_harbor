var models  = require('../models');
var Promise = require('bluebird');

var UserService=function(){};



UserService.prototype.getUser=function(userId){
    return Promise.resolve(
        models.User.findById(userId).then(function(user){
            return user;
        })
    );
}

UserService.prototype.createUser=function(user){
   return Promise.resolve(
        models.User.create(user).then(function(user){
            return user;
        })
    );
};


UserService.prototype.getAllUsers=function(){
    return Promise.resolve(
        models.User.findAll().then(function(users){
            return users;
        })
    )
};

module.exports=UserService;
