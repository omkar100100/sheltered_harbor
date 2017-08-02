var models  = require('../models');
var Promise = require('bluebird');

var UserService=function(){};


UserService.prototype.getProfile=function(userId){
 //var _user;

 return Promise.resolve(
    models.User.findById(2).then(function(user){
        return user;
    })
);
//   var userPromise= Promise.promisify(_user);
//   return userPromise;
};

module.exports=UserService;
