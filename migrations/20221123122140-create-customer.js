'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      img: {
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
      role_id: {
        type: Sequelize.INTEGER,
        references: {
        model: "roles",
        key: 'id',
        as: 'role_id'
        },
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
    await queryInterface.dropTable('Customers');
  }
};