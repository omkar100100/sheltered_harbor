var models  = require('../models');
var Promise = require('bluebird');
const jwt = require('jsonwebtoken');
var errors = require('../errors');
var SequelizeUniqueConstraintError = require("sequelize").ValidationError;
var SequelizeForeignKeyConstraintError = require("sequelize").ForeignKeyConstraintError;
var UserService=function(){};
var randomstring = require("randomstring");
var config = require('../../config');
var currentConfig = config.getCurrentConfig();
var passwordHash = require('password-hash');
var env=require('../../environment')



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
            userProfile.RoleId=user.RoleId;
            userProfile.IsActive=user.IsActive;
            return userProfile;

        })
    );
}

UserService.prototype.resetPassword=function(user,app){
     var models1 = app.get('models');
  return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
    return new Promise(function(resolve, reject){    
        models1.User.findOne({
            where: {Token: user.token }
        })
        .then(function(userRes){
            if(userRes!=null){
                var hashedPassword = passwordHash.generate(user.password);
                userRes.update({
                    Password: hashedPassword,
                    IsActive: true,
                    Token: null
                })
                .then(function(updateUser){
                    console.log("Password Updated");
                    var msg="Password Updated Successfully"
                    resolve(msg)
                })
                .catch(function(error){
                        console.log("Error:" + error);
                        reject(errors.normalizeError(null, error, null));
                })
            }else{
                 reject(errors.normalizeError('INVALID_PASSWORD_RESET', error, null));
            }
            
        })
        .catch(function(error){
             reject(errors.normalizeError(null, error, null));
        })
  })
})
};



UserService.prototype.changepassword=function(loggedInUser,user,app){
 var models1 = app.get('models');
//return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
    return new Promise(function(resolve, reject){    
        models1.User.findById(loggedInUser.id)
        .then(function(userRes){
            if(userRes!=null){
                if(passwordHash.verify(user.oldPassword, userRes.Password)){
                        var newHashedPassword = passwordHash.generate(user.newPassword);
                        userRes.update({
                            Password: newHashedPassword
                        })
                        .then(function(updateUser){
                            console.log("Password Updated Successfully");
                            var msg="Password Updated Successfully"
                            resolve(msg)
                        })
                        .catch(function(error){
                            if(error instanceof  SequelizeUniqueConstraintError){
                                reject(errors.normalizeError('UNIQUE_CONSTRAINT_FAILED', error, null));
                            }else{
                                console.log("Error:" + error);
                                reject(errors.normalizeError(null, error, null));
                            }
                        })
                }else{
                    console.log("Invalid Password");
                }
                
            }else{
                 console.log(error);
                 reject(errors.normalizeError('USERNAME_PASSWORD_INVALID', error, null));
            }
            
        })
        .catch(function(error){
             console.log(error);
             reject(errors.normalizeError(null, error, null));
        })
  })
//})
};


UserService.prototype.createUser=function(user,app){
    var models1 = app.get('models');
   return models1.sequelize.transaction({isolationLevel: models1.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED}, t1 => {
            return new Promise(function(resolve, reject){
               var passwordToken=randomstring.generate();

                user.Token=passwordToken;
                user.IsActive=false;
                models1.User.create(user,{transaction:t1})
                .then(function(user){
                        resolve(user);
                      
                        //html: encodeURI("<p>Create your password by clicking this URL </p> <a href=http://" + currentConfig.app.server.host + ":" + currentConfig.app.server.port + "/sh/reset/" + passwordToken + ">Click to create Password</a>")
                        var passwordCreateMailer=env.getMailTransporter().templateSender({
                             html: "<p><a href=http://shapp1.eastus.cloudapp.azure.com/reset/" + passwordToken + ">Click to Create Password</a></p>"
                        });

                        passwordCreateMailer({
                            from: currentConfig.mail.user,
                            to: user.Email,
                            subject: 'Password Creation'
                        }, {
                           
                        }, function(err, info){
                            if(err){
                                console.log("Email Error"+ err);
                            }else{
                                console.log('Password Create mail is  sent');
                            }
                        });         

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
                                role: role.name,
                                roleId: user.RoleId
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
                                    userObj.roleId=user.RoleId;
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
