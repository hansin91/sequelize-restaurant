'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const data = [
      {
        name: 'KFC',
        address: 'Gandaria City',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yoshinoya',
        address: 'Mall Pondok Indah',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Burger King',
        address: 'Senayan City',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Restaurants', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
