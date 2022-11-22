'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      post_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_delivered: {
        type: Sequelize.BOOLEAN,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
        model: "customers",
        key: 'id',
        as: 'customer_id'
      },
    }
    }, {
      timestamps: false,
    }); 
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
