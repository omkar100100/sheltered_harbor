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
        // InstituteId: {
        //   type:Sequelize.NUMEBR,
        //   references: {
        //     model: 'Institute',
        //     key: 'id'
        //   }
        // } ,
        RenewalDate: Sequelize.DATE,
        OldFromDate: Sequelize.DATE,
        OldToDate: Sequelize.DATE,
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
