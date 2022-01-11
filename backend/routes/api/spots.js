const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, Image, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');
const router = express.Router();

// const { setTokenCookie, requireAuth } = require('../../utils/auth');

const validateSpot = [
    check('address')
      .isLength({ max: 200 })
      .withMessage("Address must not be more than 200 characters long")
      .exists({ checkFalsy: true })
      .withMessage('Please provide a address.'),
    check('city')
        .isLength({ max: 50 })
        .withMessage("City must not be more than 50 characters long")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a city.'),
    check('state')
        .isLength({ max: 50 })
        .withMessage("State must not be more than 50 characters long")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a state.'),
    check('country')
        .isLength({ max: 50 })
        .withMessage("Country must not be more than 50 characters long")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a country.'),
    check('name')
        .isLength({ max: 50 })
        .withMessage("Title must not be more than 50 characters long")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.'),
    check('pirce')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a price.')
        .isDecimal(),
    check('zipcode')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a zipcode.'),
    check('description')
        .isLength({ max: 1000 })
        .withMessage("Description must not be more than 1000 characters long")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description.'),
    handleValidationErrors,
  ];


// ---------------------get all spots---------------------
router.get('/',asyncHandler(async function(req, res) {
    const spots = await Spot.findAll({
        include: Image,
        order: [
            ['createdAt', 'DESC']
        ]
    });
    return res.json({spots})
}))

// ---------------------get one spot---------------------
router.get('/:id(\\d+)', asyncHandler(async function(req, res){
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findOne({
        where: {id: spotId},
        include: [Image, User]
    })
    return res.json({spot});
}))

// ---------------------update one spot ---------------------
router.put('/:id(\\d+)', validateSpot, asyncHandler(async function(req, res){
    const spotId = parseInt(req.params.id, 10);
    const spotToUpdate = await Spot.findByPk(spotId);
    const {address, city, state, country, name, price, zipcode, description} = req.body;
    await spotToUpdate.update({
        address,
        city,
        state,
        country,
        name,
        price,
        zipcode,
        description
    })
    const spot = await Spot.findByPk(spotId, {include: Image});
    res.json({spot})
}))

// ---------------------delete one spot ---------------------
router.delete('/:id(\\d+)',asyncHandler(async function(req, res){
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findByPk(spotId);
    await Image.destroy({
        where: {spotId}
    })
    await spot.destroy();
    return res.json({message: "Delete sucessfully"})
}))

// ---------------------post one spot ---------------------
router.post('/create', validateSpot, multipleMulterUpload("images"), asyncHandler(async function(req, res){
    const urls = await multiplePublicFileUpload(req.files)
    const { address, city, state, country, name, price, zipcode, description, userId } = req.body;
    const spot = await Spot.creat({
        address,
        city,
        state,
        country,
        name,
        price,
        zipcode,
        description,
        userId
    })
    const spotId = spot.id;
    const imagesUrl = await urls.map(url => {
        Image.create({spotId, url})
    })
    return res.json({spot, imagesUrl})

}))

module.exports = router;
