'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
    'customers',
    [
        {
            first_name: 'Guillaume',
            last_name: 'Bongrand',
            email: 'guillaumebongrand.lamanu@gmail.com',
            password: 'mdpGuillaumeBongrand',
            notifications: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            first_name: 'Amadou',
            last_name: 'Camara',
            email: 'amadoucamara.lamanu@gmail.com',
            password: 'mdpAmadouCamara',
            notifications: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    {}
    );
},

async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('customers', null, {});
},
};
