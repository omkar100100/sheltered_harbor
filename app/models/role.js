"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: Sequelize.STRING ,
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
    tableName: 'Roles'
  }, {
      classMethods: {
        getSequelize:function(){
          return sequelize;
        },

        createRole: function(role,sequelize) {
          role.save()
          .error(function(error){
            console.log(error);
          })
          .success(function(result){
            return result
          })
        }
    }
  })

  return Role;
}      