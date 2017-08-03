"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var SHLog = sequelize.define("SHLog", {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        TxHash : Sequelize.STRING,
        Filename: { 
          type:Sequelize.STRING
        },

        Tag: Sequelize.STRING,
        AdditionalData: Sequelize.STRING,
        UploadTimestamp: Sequelize.DATE,
        AttestationDate: Sequelize.DATE,
        Status:Sequelize.STRING,
        InstituteId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Institute',
            key: 'id'
          }
        },
        ServiceProviderId :{
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
  }, {
      getterMethods: {
          fullName: function(){
            return "hello"
          }
      }
  })

 SHLog.associate = function(models) {
     SHLog.belongsTo(models.Institute, {
      foreignKey: {
        allowNull: false
      }
    });

 }
  
  return SHLog;
};
