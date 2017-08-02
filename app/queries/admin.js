var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'sheltered_harbor',
    schema: 'public',
    user: 'postgres',
    password: 'admin123'
});


function getAllAdmins(req, res, next) {
  db.any('select * from admin')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Admins'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAdminById(req, res, next) {
  var adminId = parseInt(req.params.id);
  db.one('select * from admin where id = $1', adminId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved Admin'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createAdmin(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into admin(username,password)' +
      'values(${username},${password})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted Admin'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}




module.exports = {
  createAdmin: createAdmin,
  getAdminById: getAdminById,
  getAllAdmins: getAllAdmins
};
