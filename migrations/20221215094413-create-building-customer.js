'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Customers-Buildings', {
      id: {
        type: Sequelize.INTEGER,
      },
      customers_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      buildings_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Buildings',
          key: 'id'
        }
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers-Buildings');
  }
};
