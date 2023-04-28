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
      oxydants: {
        type: Sequelize.FLOAT
      },
      reducers: {
        type: Sequelize.FLOAT,
      },
      nh3: {
        type: Sequelize.FLOAT,
      },
      light: {
        type: Sequelize.FLOAT,
      },
      pressure: {
        type: Sequelize.FLOAT,
      },
      humidity: {
        type: Sequelize.FLOAT,
      },
      pm1: {
        type: Sequelize.FLOAT,
      },
      pm2_5: {
        type: Sequelize.FLOAT,
      },
      pm10: {
        type: Sequelize.FLOAT,
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