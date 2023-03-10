'use strict';
const db = require('./../models/index');
const Roles = db['Roles'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'roles',
      [
        {
            id: 1,
            name: 'ADMIN',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'PROPLUS',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'PRO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      ],
      {}
      );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('roles', null, {})
  }
};
