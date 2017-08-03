"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('PasswordRecoverys', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        UserId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        Token: Sequelize.DATE,
        RequestDate: Sequelize.DATE,
        ExpiryDate: Sequelize.DATE,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: { 
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
    
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('PasswordRecoverys');
  }
};
