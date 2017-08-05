"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var IdType = sequelize.define("IdType", {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        Name: Sequelize.STRING,
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
       schema : 'sh',
      freezeTableName: true,
      tableName: 'IdTypes'
  });

  return IdType;
};
