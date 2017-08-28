var models  = require('../models');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');

var UserService=function(){};



UserService.prototype.getUser=function(userId){
    return Promise.resolve(
        models.User.findOne({
            where: {id:userId},
            attributes: {exclude: ['Password','Token','updatedAt','createdAt'] }
        }).then(function(user){
            return user;
        })
    );
}

UserService.prototype.createUser=function(user,app){
    var models1 = app.get('models');
   return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
            return new Promise(function(resolve, reject){
                //TODO: Adding Username, password requires different workflow
                user.Username="admin";
                //TODO: Encrypt the password
                user.Password="admin";
                models1.User.create(user,{transaction:t1})
                .then(function(user){
                    resolve(user);
                })
            })

    })
};

UserService.prototype.findByUsername=function(username){
    return new Promise(function(resolve,reject){
        models.User.findOne({
            where: {Username:username}
        }).then(function(user){
            resolve(user);
        })

    })
        
}

UserService.prototype.authenticate=function (userObj) {
    return this.findByUsername(userObj.user).then(function(user){
        return new Promise((resolve, reject) => {
            jwt.sign(
            {
                id: user.id,
                username: user.Username,
                role: user.RoleId
            },
            process.env.AUTHENTICATION_SECRET,
            { expiresIn: '7d' },
            (token, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
            );
        });
    });

//   if (!user || !user.passwordMatches(user.password)) {
//     // We use the same error either if the user is not found or if the password doesn't match.
//     // This way, if someone is trying to list users by bruteforcing the authentication endpoint,
//     // they won't know whether they found an existing username or not.
//     throw new Error('User not found');
//   }

  
}

UserService.prototype.getAllUsers=function(){
    return Promise.resolve(
        models.User.findAll().then(function(users){
            return users;
        })
    )
};

module.exports=UserService;
