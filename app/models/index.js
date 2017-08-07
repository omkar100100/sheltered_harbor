"use strict";

 
 
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
const cls = require('continuation-local-storage'),
 namespace = cls.createNamespace('my-very-own-namespace');
 Sequelize.useCLS(namespace);

 
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', '..','config', 'config.json'))[env];
if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL,config);
} else {
 
//  var sequelize = new Sequelize('postgres','postgres',"",{
//     host: '10.10.10.4',
//     dialect :'postgres', 
//     port:'5432',
//     schema:'sh'
//   });

  var sequelize = new Sequelize('sheltered_harbor','postgres',"admin123",{
    host: 'localhost',
    dialect :'postgres', 
    port:'5432',
    schema:'public'
  });
}

sequelize.authenticate().then(function(errors){
  console.log("Errors:"+ errors);
});

var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
