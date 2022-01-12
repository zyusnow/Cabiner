'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Spots', [
        {
          name: "Tye Haus - A-Frame Cabin",
          address: "76141 NE 122nd St",
          city: "Skykomish",
          state: "WA",
          country:"United Status",
          zipcode: "98288",
          price: "460",
          userId: 1,
          description: `Our A-frame is settled in the private cabin community of Timber Lane Village just minutes from Steven's Pass ski resort and some of the best hiking spots in the central cascades.
          The space: Our cabin community is just off highway 2. You can see from our reviews that most guests find our place quiet and only a couple have complained about the highway noise. We just want to point this out for full disclosure :-)
          Guest access: On the day of your check-in, the owner will text or message your the access codes for the alarm and key lock box.`
        },
        {
          name: "Elliott's Cabin ~ Charming and Cozy",
          address: "395 Thompson Rd",
          city: "Sequim",
          state: "WA",
          country:"United Status",
          zipcode: "98382",
          price: "170",
          userId: 1,
          description: `Elliott's Cabin is a log cabin snuggled in the cascade foothills, but only 45 minutes from downtown Seattle. We are 15 minutes from Snoqualmie Falls and close to numerous breathtaking hikes. Sleep in a snug loft and enjoy the convenience of a full kitchen.
          Elliott's Cabin is in a wooded setting across from a lake. We have a canoe you may carry across the street to pristine Lake Alice for a scenic paddle or swim!:)`
        },
        {
          name: "White Pine Cabin Mountain Retreat",
          address: "58 Tiffany Rd",
          city: "Republic",
          state: "WA",
          country:"United Status",
          zipcode: "99166",
          price: "340",
          userId: 1,
          description: `A glitter of green and golden wonder in a vast edifice of stone and space" is how Ansel Adams described Yosemite, but he could have easily been describing this section of the Snoqualmie River.
          If Ansel were alive today, this historic cabin would be his retreat; his muse.`
        },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Spots', null, {});
  }
};
