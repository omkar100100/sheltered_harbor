"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('AccessLogs', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        Timestamp: Sequelize.DATE,
        Activity: Sequelize.STRING,
        Status: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: { 
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        UserId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('AccessLogs');
  }
};
