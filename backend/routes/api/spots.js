const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, Image, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
// const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');
const router = express.Router();

// const { setTokenCookie, requireAuth } = require('../../utils/auth');

const validateSpot = [
    check('address')
      .isLength({ max: 200 })
      .exists({ checkFalsy: true })
      .withMessage("Address must not be more than 200 characters long"),
    check('city')
        .isLength({ max: 50 })
        .exists({ checkFalsy: true })
        .withMessage("City must not be more than 50 characters long"),
    check('state')
        .isLength({ max: 50 })
        .exists({ checkFalsy: true })
        .withMessage("State must not be more than 50 characters long"),
    check('country')
        .isLength({ max: 50 })
        .exists({ checkFalsy: true })
        .withMessage("Country must not be more than 50 characters long"),
    check('name')
        .isLength({ max: 50 })
        .exists({ checkFalsy: true })
        .withMessage("Title must not be more than 50 characters long"),
    check('pirce')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a price.'),
    check('zipcode')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a zipcode.'),
    check('description')
        .isLength({ max: 1000 })
        .exists({ checkFalsy: true })
        .withMessage("Description must not be more than 1000 characters long"),
    check('url')
        .isLength({ max: 250 })
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image url"),
    // handleValidationErrors,
  ];


// ---------------------get all spots---------------------
router.get('/',asyncHandler(async function(req, res) {
    const spots = await Spot.findAll({
        include: Image,
        order: [
            ['createdAt', 'DESC']
        ]
    });
    return res.json(spots)
}))

// ---------------------get one spot---------------------
// router.get('/:id(\\d+)', asyncHandler(async function(req, res){
router.get('/:id(\\d+)', asyncHandler(async function(req, res){
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findOne({
        where: {id: spotId},
        include: [Image, User]
    })
    return res.json(spot);
}))

// ---------------------update one spot ---------------------
// router.put('/:id(\\d+/)', validateSpot, asyncHandler(async function(req, res){
router.put('/:id(\\d+)/edit', requireAuth, asyncHandler(async function(req, res){
    const spotId = parseInt(req.params.id, 10);
    const spotToUpdate = await Spot.findByPk(spotId);
    const {address, city, state, country, name, price, zipcode, description, url} = req.body;
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
    const newImgUrl = {
        spotId,
        url
    }
    const img = await Image.findOne({
        where:url
    })
    await img.update(newImgUrl)
    const spot = await Spot.findByPk(spotId, {include: Image});
    res.json(spot)
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
router.post('/add', requireAuth, validateSpot, asyncHandler(async function(req, res){
    // const urls = await multiplePublicFileUpload(req.files)

    const { address, city, state, country, name, price, zipcode, description, userId, url } = req.body;
    const spot = await Spot.create({
        address,
        city,
        state,
        country,
        name,
        price,
        zipcode,
        description,
        userId
    });
    const spotId = spot.id;
    const newImgUrl = {
        spotId,
        url
    }
    await Image.create(newImgUrl)
    return res.json(spot)
}))

module.exports = router;
