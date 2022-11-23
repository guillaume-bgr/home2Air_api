'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sensors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
        model: "customers",
        key: 'id',
        as: 'customer_id'
        },
      },
      park_id: {
        type: Sequelize.INTEGER,
        references: {
        model: "parks",
        key: 'id',
        as: 'park_id'
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sensors');
  }
};