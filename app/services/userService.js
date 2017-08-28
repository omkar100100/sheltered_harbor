var models  = require('../models');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');
var errors = require('../errors');

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



UserService.prototype.getUsers=function(username){
    return new Promise(function(resolve,reject){
        models.User.findAll().then(function(users){
            resolve(users);
        })

    })
        
}


UserService.prototype.authenticate=function (userObj) {
    return this.findByUsername(userObj.username).then(function(user){
        if(user==null){
           return errors.normalizeError('USERNAME_PASSWORD_INVALID', null, null); 
        }

        if (user!=null && user.Password==userObj.password){
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
           
        }else{
            return reject(errors.normalizeError('USERNAME_PASSWORD_INVALID', null, null));
        }
        
   })
   .catch(function(error){
       return errors.normalizeError('USERNAME_PASSWORD_INVALID', error, null);
   })
  
}

UserService.prototype.getAllUsers=function(){
    return Promise.resolve(
        models.User.findAll().then(function(users){
            return users;
        })
    )
};

module.exports=UserService;
