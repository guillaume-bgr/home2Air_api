'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SensorHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      co: {
        type: Sequelize.FLOAT
      },
      no2: {
        type: Sequelize.FLOAT
      },
      nh3: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.DATE
      },
      sensors_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sensors",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SensorHistories');
  }
};