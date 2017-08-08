"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        FirstName: Sequelize.STRING,
        LastName: Sequelize.STRING,
        Email: Sequelize.STRING,
        Mobile: Sequelize.STRING,
        RoleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Roles',
            key: 'id'
          }
        },
        Username: Sequelize.STRING,
        Password: Sequelize.STRING,
        IsActive:{
          type: Sequelize.BOOLEAN,
          allowNull: false, 
          defaultValue: true
        },
        Token: Sequelize.STRING,
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
      schema:'public',
      freezeTableName: true,
      tableName: 'Users'
    })

 User.associate = function(models) {
    User.hasMany(models.AccessLog);
 }
  
  return User;
};
