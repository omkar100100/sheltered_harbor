"use strict";
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var ServiceProviderMapping = sequelize.define("ServiceProviderMapping", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: Sequelize.STRING        
   
    },{
    schema: "sh",
    freezeTableName: true,
    tableName: 'ServiceProviderMapping'
  })

  return ServiceProviderMapping;
}      