"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('QuorumNode', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        NodeName: Sequelize.STRING,
        EthereumHash : Sequelize.STRING,
        IpAddress: Sequelize.STRING,
        LastSyncDate: Sequelize.STRING,
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
      .dropTable('QuorumNode');
  }
};
