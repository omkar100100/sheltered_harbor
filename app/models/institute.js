"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
      var Institute = sequelize.define("Institute", {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        LegalName: Sequelize.STRING,
        Address: Sequelize.STRING,
        PhoneNumber: Sequelize.STRING,
        ContractState: Sequelize.STRING,
        ContractFrom:{ 
          type: Sequelize.DATE ,
          defaultValue: Sequelize.NOW
        },
        ContractTo: { 
          type: Sequelize.DATE ,
          allowNull: true
        },
        ContactName: Sequelize.STRING,
        ContactEmail: Sequelize.STRING,
        ContactPhone: Sequelize.STRING,
        Type: Sequelize.STRING,
        Identifier: Sequelize.STRING,
        ServiceProviderId :{
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Institute',
            key: 'id',
            deferrable: Sequelize.Deferrable.NOT
          }
        },
        IdType :Sequelize.STRING,
        NodeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'QuorumNode',
            key: 'id'
          }
        },
        IsActive:{
          type: Sequelize.BOOLEAN,
          allowNull: false, 
          defaultValue: true
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
  },{
      schema : 'public',
      freezeTableName: true,
      tableName: 'Institute'
  })
 


  Institute.associate = function(models){
    Institute.hasMany(models.SHLog);
  }
  return Institute;
};
