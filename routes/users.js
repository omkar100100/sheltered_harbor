var models  = require('../app/models');
var userController = require('../app/controllers/userController');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
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
});

router.get('/:userId',userController.getUserProfile
  
  // function(request,response){
  //   models.User.findById(1).then(function(user){
  //     response.json(user);
  //   });
  //}
);

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

router.post('/:user_id/log/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:log_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    res.redirect('/');
  });
});


module.exports = router;
