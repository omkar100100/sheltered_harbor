"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("User", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: Sequelize.STRING        
  })
}      