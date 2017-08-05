"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var PasswordRecovery = sequelize.define("PasswordRecovery", {
    id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        UserId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        Token: Sequelize.DATE,
        RequestDate: Sequelize.DATE,
        ExpiryDate: Sequelize.DATE,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: { 
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
    
    },{
        schema : 'sh',
        freezeTableName: true,
        tableName: 'PasswordRecovery'
    });
  
   return PasswordRecovery;
};
