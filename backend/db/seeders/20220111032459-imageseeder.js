
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Images', [
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850342/1.1_nquhnb.jpg"
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850341/1.2_m8cu7p.jpg"
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850340/1.3_bmdmae.jpg"
        },
        {
          spotId: 1,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850341/1.4_zbxeeb.jpg"
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850351/2.1_ja8krf.jpg"
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850347/2.2_oldbcu.jpg"
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850341/2.3_r0afzd.jpg"
        },
        {
          spotId: 2,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850343/2.4_y3peqj.jpg"
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850355/3.1_ooijnz.jpg"
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850344/3.2_m3oz0w.jpg"
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850355/3.3_mpkqra.png"
        },
        {
          spotId: 3,
          url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850344/3.4_b2mqgy.jpg"
        },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Images', null, {});
  }
};

