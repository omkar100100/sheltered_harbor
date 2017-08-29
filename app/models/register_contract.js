"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var RegisterContract = sequelize.define("RegisterContract", {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        InstituteId:{ 
           type: Sequelize.INTEGER,
           allowNull: true,
           references: {
                model: 'Institute',
                key: 'id',
                deferrable: Sequelize.Deferrable.NOT
          }
         } ,
        ContractAddress:{
            type: Sequelize.STRING
        },
        AccountAddress:{
            type: Sequelize.STRING
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
    schema: "public",
    freezeTableName: true,
    tableName: 'RegisterContract'
  })

  return RegisterContract;
}      