"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('UserInstitute', {
       id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        UserId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        InstituteId :{
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
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('UserInstitute');
  }
};
