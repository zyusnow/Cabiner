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
        .isLength({ max: 20 })
        .exists({ checkFalsy: true })
        .withMessage('Zipcode must not be more than 20 characters long'),
    check('description')
        .isLength({ max: 1000 })
        .exists({ checkFalsy: true })
        .withMessage("Description must not be more than 1000 characters long"),
    check('url')
        .isLength({ max: 250 })
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image url."),
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
        const { oneSpot, images} = req.body;
        await spotToUpdate.update(oneSpot);


        const newImg1 = {
            id: images.url1.id,
            spotId,
            url: images.url1.url
        }
        const img1 = await Image.findByPk(images.url1.id)
        await img1.update(newImg1)

        const newImg2 = {
            id: images.url2.id,
            spotId,
            url: images.url2.url
        }
        const img2 = await Image.findByPk(images.url2.id)
        await img2.update(newImg2)

    const newImg3 = {
        id: images.url3.id,
        spotId,
        url: images.url3.url
    }
    const img3 = await Image.findByPk(images.url3.id)
    await img3.update(newImg3)

    const newImg4 = {
        id: images.url4.id,
        spotId,
        url: images.url4.url
    }
    const img4 = await Image.findByPk(images.url4.id)
    await img4.update(newImg4)

    // const newImgUrl = {
    //     spotId,
    //     url
    // }
    // const img = await Image.findOne({
    //     where:url
    // })
    // await img.update(newImgUrl)
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

    // const { address, city, state, country, name, price, zipcode, description, userId, image1, image2, image3, image4 } = req.body;
    const { oneSpot, images} = req.body;
    const spot = await Spot.create(oneSpot);
    const newImg1 = {
        spotId: spot.id,
        url:images.url1
    }
    await Image.create(newImg1)

    const newImg2 = {
        spotId: spot.id,
        url:images.url2
    }
    await Image.create(newImg2)

    const newImg3 = {
        spotId: spot.id,
        url:images.url3
    }
    await Image.create(newImg3)

    const newImg4 = {
        spotId: spot.id,
        url:images.url4
    }
    await Image.create(newImg4)

    return res.json(spot)

    // const spot = await Spot.create({
    //     address,
    //     city,
    //     state,
    //     country,
    //     name,
    //     price,
    //     zipcode,
    //     description,
    //     userId
    // });
    // const spotId = spot.id;
    // const newImgUrl = {
    //     spotId,
    //     url
    // }
    // await Image.create(newImgUrl)
    // return res.json(spot)
}))

module.exports = router;
