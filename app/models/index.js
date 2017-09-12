"use strict";

 
 
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config = require('../../config');
var currentConfig = config.getCurrentConfig();


  var sequelize = new Sequelize(currentConfig.postgres.database,currentConfig.postgres.username,process.env.POSTGRES_PWD,{
    host: currentConfig.postgres.host,
    dialect :currentConfig.dialect, 
    port:currentConfig.postgres.port,
    schema:currentConfig.postgres.schema
  });

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
