"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('SHLogs', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        TxHash : Sequelize.STRING,
        Filename: Sequelize.STRING,
        Tag: Sequelize.STRING,
        AdditionalData: Sequelize.STRING,
        UploadTimestamp: Sequelize.DATE,
        AttestationDate: Sequelize.DATE,
        Status:Sequelize.STRING,
        InstituteId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Institutes',
            key: 'id'
          }
        },
        ServiceProviderId :{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Institutes',
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
      })
  }

 
};
