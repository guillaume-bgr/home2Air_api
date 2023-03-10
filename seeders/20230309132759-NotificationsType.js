'use strict';

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
      'notification_types',
      [
        {
            name: 'DANGER',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'MODERATE',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
          name: 'SUCCESS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'INFO',
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
    await queryInterface.bulkDelete('notification_types', null, {})
  }
};