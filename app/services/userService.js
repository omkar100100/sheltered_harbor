var models  = require('../models');
var Promise = require('bluebird');

var UserService=function(){};


UserService.prototype.getProfile=function(userId){


 return Promise.resolve(
    models.User.findById(2).then(function(user){
        return user;
    })
);

};

module.exports=UserService;
