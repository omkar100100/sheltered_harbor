"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var QuorumNode = sequelize.define("QuorumNode", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: Sequelize.STRING,
        EthereumHash : Sequelize.STRING,
        IpAddress: Sequelize.STRING,
        LastSyncDate: Sequelize.STRING,
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
       schema : 'public',
      freezeTableName: true,
      tableName: 'QuorumNode'
  });

  
  return QuorumNode;
};
