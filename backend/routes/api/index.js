// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

// all the test case of auth middlewares
// GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));


// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;



// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       */
//       return queryInterface.bulkInsert('Images', [
//         {
//           spotId: 1,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850342/1.1_nquhnb.jpg"
//         },
//         {
//           spotId: 1,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850341/1.2_m8cu7p.jpg"
//         },
//         {
//           spotId: 1,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850340/1.3_bmdmae.jpg"
//         },
//         {
//           spotId: 1,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850341/1.4_zbxeeb.jpg"
//         },
//         {
//           spotId: 2,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850351/2.1_ja8krf.jpg"
//         },
//         {
//           spotId: 2,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850347/2.2_oldbcu.jpg"
//         },
//         {
//           spotId: 2,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850341/2.3_r0afzd.jpg"
//         },
//         {
//           spotId: 2,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850343/2.4_y3peqj.jpg"
//         },
//         {
//           spotId: 3,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850355/3.1_ooijnz.jpg"
//         },
//         {
//           spotId: 3,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850344/3.2_m3oz0w.jpg"
//         },
//         {
//           spotId: 3,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850355/3.3_mpkqra.png"
//         },
//         {
//           spotId: 3,
//           url: "https://res.cloudinary.com/dprnsux1z/image/upload/v1641850344/3.4_b2mqgy.jpg"
//         },

//     ], {});
//   },

//   down: (queryInterface, Sequelize) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       */
//       return queryInterface.bulkDelete('Images', null, {});
//   }
// };



// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       */
//       return queryInterface.bulkInsert('Spots', [
//         {
//           name: "Tye Haus - A-Frame Cabin",
//           address: "76141 NE 122nd St",
//           city: "Skykomish",
//           state: "WA",
//           country:"United Status",
//           zipcode: 98288,
//           price: "460",
//           userId: 1,
//           lat: 47.71255,
//           ing: -121.31474,
//           description: `Our A-frame is settled in the private cabin community of Timber Lane Village just minutes from Steven's Pass ski resort and some of the best hiking spots in the central cascades.
//           The space: Our cabin community is just off highway 2. You can see from our reviews that most guests find our place quiet and only a couple have complained about the highway noise. We just want to point this out for full disclosure :-)
//           Guest access: On the day of your check-in, the owner will text or message your the access codes for the alarm and key lock box.`
//         },
//         {
//           name: "Elliott's Cabin ~ Charming and Cozy",
//           address: "395 Thompson Rd",
//           city: "Sequim",
//           state: "WA",
//           country:"United Status",
//           zipcode: 98382,
//           price: "170",
//           userId: 1,
//           lat: 48.05408,
//           ing: -122.98732,
//           description: `Elliott's Cabin is a log cabin snuggled in the cascade foothills, but only 45 minutes from downtown Seattle. We are 15 minutes from Snoqualmie Falls and close to numerous breathtaking hikes. Sleep in a snug loft and enjoy the convenience of a full kitchen.
//           Elliott's Cabin is in a wooded setting across from a lake. We have a canoe you may carry across the street to pristine Lake Alice for a scenic paddle or swim!:)`
//         },
//         {
//           name: "White Pine Cabin Mountain Retreat",
//           address: "58 Tiffany Rd",
//           city: "Republic",
//           state: "WA",
//           country:"United Status",
//           zipcode: 99166,
//           price: "340",
//           userId: 1,
//           lat: 41.67088,
//           ing: -71.54643,
//           description: `A glitter of green and golden wonder in a vast edifice of stone and space" is how Ansel Adams described Yosemite, but he could have easily been describing this section of the Snoqualmie River.
//           If Ansel were alive today, this historic cabin would be his retreat; his muse.`
//         },

//     ], {});
//   },

//   down: (queryInterface, Sequelize) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       */
//       return queryInterface.bulkDelete('Spots', null, {});
//   }
// };
