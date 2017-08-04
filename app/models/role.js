"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: Sequelize.STRING ,
         createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updatedAt:{ 
          type: Sequelize.DATE, 
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
  },{
    freezeTableName: true,
    tableName: 'Roles'
  })

  return Role;
}      