"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('InstituteHistory', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        InstituteId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Institute',
            key: 'id'
          }
        },
        RenewalDate: Sequelize.DATE,
        OldFromDate: Sequelize.DATE,
        OldToDate: Sequelize.DATE,
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
      });
  },

 down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('InstituteHistory');
  }
};
