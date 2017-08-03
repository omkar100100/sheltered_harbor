var models  = require('../app/models');
var userController = require('../app/controllers/userController');
var express = require('express');
var ROUTER  = express.Router();
var acl = require('express-acl');
var faker = require('faker');

  var mockUser = {
      _id: faker.random.uuid(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'user'
    };

var createToken = function(user) {
      var token = jwt.sign(user, key, {
        expiresInMinute: 1440
      });
      return token;
    };

 acl.config({
    filename: 'nacl.json',
    baseUrl: 'v1'
  });

  var key = 'thisisaverysecurekey';

  /**
     * Middleware to inject token to header
     * Note: this is done in the front end,
     *  therefore this code is for illustration only
     */
    ROUTER.use(function(req, res, next) {
      var token = createToken(mockUser);
      req.headers['x-access-token'] = token;
      next();
    });

    /**
     * lets create our jwt middleware
     */

    ROUTER.use(function(req, res, next) {
      var token = req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, key, function(err, decoded) {
          if (err) {
            return res.send(err);
          } else {
            req.decoded = decoded;
            next();
          }

        });
      }
    });


    ROUTER.use(acl.authorize.unless({
          path: ['/v1/blogs']
      }));

      ROUTER.route('/user')
      .post(function(req, res) {
        models.User.create({
          FirstName: req.body.firstName,
          LastName: req.body.lastName,
          Email: req.body.email,
          Mobile: req.body.mobile,
          RoleId:1,
          Username: req.body.userName,
          Password: req.body.password,
          IsActive: true,
          Token: "xxxx" // token generation logic
        }).then(function(user){
          res.json(user);
        })
      })


// ROUTER.post('/create', function(req, res) {
//   models.User.create({
//     FirstName: req.body.firstName,
//     LastName: req.body.lastName,
//     Email: req.body.email,
//     Mobile: req.body.mobile,
//     RoleId:1,
//     Username: req.body.userName,
//     Password: req.body.password,
//     IsActive: true,
//     Token: "xxxx" // token generation logic
//   }).then(function(user){
//     res.json(user);
//   })
// });

ROUTER.get('/:userId',userController.getUserProfile
  
  // function(request,response){
  //   models.User.findById(1).then(function(user){
  //     response.json(user);
  //   });
  //}
);

ROUTER.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

ROUTER.post('/:user_id/log/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function() {
    res.redirect('/');
  });
});

ROUTER.get('/:user_id/tasks/:log_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

ROUTER.route('/blogs')
      .post(function(req, res) {
        res.send({
          message: 'Access granted'
        });
      })
      .get(function(req, res) {
        res.send({
          message: 'Access granted'
        });
      })
      .put(function(req, res) {
        res.send({
          message: 'Access granted'
        });
      })
      .delete(function(req, res) {
        res.send({
          message: 'Access granted'
        });
      });

module.exports = ROUTER;
