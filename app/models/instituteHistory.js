"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var InstHistory = sequelize.define("InstituteHistory", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        InstituteId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Institute',
            key: 'id'
          }
        },
        RenewalDateFrom: { 
          type:Sequelize.DATE,
          allowNull:false
        },
        RenewalDateTo: { 
          type:Sequelize.DATE,
          allowNull:false
        },
        OldFromDate: {
          type:Sequelize.DATE,
          allowNull:true
        },
        OldToDate: { 
          type:Sequelize.DATE,
          allowNull:true
        },
        Note: Sequelize.STRING,
        
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: { 
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
    }, {
    schema : 'public',
    freezeTableName: true,
    tableName: 'InstituteHistory'
  })

  return InstHistory;
};
