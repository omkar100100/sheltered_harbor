"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var AccessLog = sequelize.define("AccessLog", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        Timestamp: Sequelize.DATE,
        Activity: Sequelize.STRING,
        Status: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: { 
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        UserId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
    })

  
  // AccessLog.associate = function(models) {
  //   AccessLog.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // }
  
  return AccessLog;
};
