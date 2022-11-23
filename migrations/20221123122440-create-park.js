'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parks', {
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
      company_id: {
        type: Sequelize.INTEGER,
        references: {
        model: "companies",
        key: 'id',
        as: 'company_id'
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Parks');
  }
};