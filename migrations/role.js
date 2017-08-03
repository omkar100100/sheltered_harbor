"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Roles', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: Sequelize.STRING 
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Roles');
  }
};
