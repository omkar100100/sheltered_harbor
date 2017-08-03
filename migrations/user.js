"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        FirstName: Sequelize.STRING,
        LastName: Sequelize.STRING,
        Email: Sequelize.STRING,
        Mobile: Sequelize.STRING,
        RoleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Roles',
            key: 'id'
          }
        },
        Username: Sequelize.STRING,
        Password: Sequelize.STRING,
        IsActive:{
          type: Sequelize.BOOLEAN,
          allowNull: false, 
          defaultValue: true
        },
        Token: Sequelize.STRING,
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
      })
  },

 down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
