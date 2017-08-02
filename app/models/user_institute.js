"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var UserInstitute = sequelize.define("UserInstitute", {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        UserId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        InstituteId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Institute',
            key: 'id'
          }
        },
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
      });

 UserInstitute.associate = function(models) {
    User.hasMany(models.AccessLog);
 }
  
  return UserInstitute;
};
