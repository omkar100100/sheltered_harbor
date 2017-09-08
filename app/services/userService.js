var models  = require('../models');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');
var errors = require('../errors');
var SequelizeUniqueConstraintError = require("sequelize").ValidationError;
var SequelizeForeignKeyConstraintError = require("sequelize").ForeignKeyConstraintError;
var UserService=function(){};


var passwordHash = require('password-hash');



UserService.prototype.getUserProfile=function(req){
     if (req.user==null){
        reject(errors.normalizeError('USER_NOT_AUTHENTICATED', error, null));
     }

    return Promise.resolve(
        models.User.findOne({
            where: {id:req.user.id},
            attributes: {exclude: ['Password','Token','updatedAt','createdAt'] },
            include: [{
                model: models.Role
            }]
        }).then(function(user){
          var userProfile={};
            userProfile.Email=user.Email;
            userProfile.FirstName=user.FirstName;
            userProfile.LastName=user.LastName;
            userProfile.id=user.id;
            userProfile.Mobile=user.Mobile;
            userProfile.Username=user.Username;
            userProfile.Role=user.Role.name;
            userProfile.IsActive=user.IsActive;
            return userProfile;

        })
    );
}

UserService.prototype.createUser=function(user,app){
    var models1 = app.get('models');
   return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
            return new Promise(function(resolve, reject){
              //var passwordToke=
              //var hashedPassword = passwordHash.generate(user.Password);
              user.Password=hashedPassword;
                models1.User.create(user,{transaction:t1})
                .then(function(user){
                    resolve(user);
                })
                .catch(function(error){
                    if(error instanceof  SequelizeUniqueConstraintError){
                         reject(errors.normalizeError('UNIQUE_CONSTRAINT_FAILED', error, null));
                    }else{
                        console.log("Error:" + error);
                        reject(errors.normalizeError(null, error, null));
                    }
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



UserService.prototype.getAllUsers=function(){
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
        }else if(!user.IsActive){
            return errors.normalizeError('USER_DISABLED', null, null); 
        }

        if (user!=null && passwordHash.verify(userObj.password, user.Password)){
                return new Promise((resolve, reject) => {
                    models.Role.findById(user.RoleId)
                    .then(function(role){
                            useObj={};
                            jwt.sign(
                            {
                                id: user.id,
                                username: user.Username,
                                role: role.name
                            },
                            process.env.AUTHENTICATION_SECRET,
                            { expiresIn: '7d' },
                            (token, err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    useObj.id=user.id;
                                    userObj.username=user.Username;
                                    userObj.role=role.name;
                                    userObj.token=token;
                                    resolve(userObj);
                                }
                            }
                            ); // sign

                    })// then

                    
                }); // promise
           
        }else{
            return reject(errors.normalizeError('USERNAME_PASSWORD_INVALID', null, null));
        }
        
   })
   .catch(function(error){
       return errors.normalizeError('USERNAME_PASSWORD_INVALID', error, null);
   })
  
}

UserService.prototype.toggleUser=function(userId){
    return new Promise(function(resolve,reject){
        models.User.findById(userId)
        .then(function(user){
            user.update({ IsActive: !user.IsActive})
            .then(function(result){
                resolve("OK");
            })
            .catch(function(error){
                console.log(error);
            })
        })
    })
        
    
};

module.exports=UserService;
