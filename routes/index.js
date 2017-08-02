var express = require('express');
var router = express.Router();
// var db = require('../queries');
// var admindb=require('../app/queries/admin');
var models  = require('../app/models');


router.get('/', function(req, res) {
  models.User.findAll({
   include: [ models.AccessLog ]
  }).then(function(users) {
      res.json(users);
  });
});




// router.get('/api/puppies', db.getAllPuppies);
// router.get('/api/puppies/:id', db.getSinglePuppy);
// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);

// router.get('/api/admin', admindb.getAllAdmins);
// router.get('/api/admin/:id', admindb.getAdminById);
// router.post('/api/admin', admindb.createAdmin);
// router.get('/', function (req, res) {
//     res.render('index', {title: 'node-postgres-promises'}); 
// });

module.exports = router;
