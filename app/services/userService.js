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

UserService.prototype.createUser=function(user,app){
    var models1 = app.get('models');
   return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
            return new Promise(function(resolve, reject){
                user.RoleId=1;
                models1.User.create(user,{transaction:t1})
                .then(function(user){
                    resolve(user);
                })
            })

    })
};


UserService.prototype.getAllUsers=function(){
    return Promise.resolve(
        models.User.findAll().then(function(users){
            return users;
        })
    )
};

module.exports=UserService;
