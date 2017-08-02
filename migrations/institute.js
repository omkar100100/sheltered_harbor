"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Institute', {
         id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        LegalName: Sequelize.STRING,
        Address: Sequelize.STRING,
        PhoneNumber: Sequelize.STRING,
        ContractState: Sequelize.STRING,
        ContractFrom: Sequelize.INTEGER,
        ContractTo: Sequelize.STRING,
        ContactName: Sequelize.STRING,
        ContactEmail: Sequelize.STRING,
        ContactPhone: Sequelize.STRING,
        Type: Sequelize.STRING,
        UniqueId: Sequelize.STRING,
        ServiceProviderId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Institute',
            key: 'id'
          }
        },
        IdType :Sequelize.STRING,
        NodeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'QuorumNode',
            key: 'id'
          }
        },
        IsActive:{
          type: Sequelize.BOOLEAN,
          allowNull: false, 
          defaultValue: true
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
      .dropTable('Institute');
  }
};
