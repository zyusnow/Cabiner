const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, Image, User } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const validateSpot = [
    check('oneSpot.address')
        .exists({ checkFalsy: true })
        .withMessage("Please provide an address")
        .isLength({ max: 200 })
        .withMessage("Address must not be more than 200 characters long"),
    check('oneSpot.city')
        .exists({ checkFalsy: true })
        .withMessage("Please provide an city")
        .isLength({ max: 50 })
        .withMessage("City must not be more than 50 characters long"),
    check('oneSpot.state')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a state")
        .isLength({ max: 50 })
        .withMessage("State must not be more than 50 characters long"),
    check('oneSpot.country')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a country")
        .isLength({ max: 50 })
        .withMessage("Country must not be more than 50 characters long"),
    check('oneSpot.name')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a name")
        .isLength({ max: 50 })
        .withMessage("Title must not be more than 50 characters long"),
    check('oneSpot.price')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a price.'),
    check('oneSpot.zipcode')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a zipcode")
        .isLength({ max: 20 })
        .withMessage('Zipcode must not be more than 20 characters long'),
    check('oneSpot.description')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a description")
        .isLength({ max: 1000 })
        .withMessage("Description must not be more than 1000 characters long"),
    check('images.img1.url')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image url")
        .isURL()
        .isLength({ max: 1000 })
        .withMessage("Please provide a valid image url"),
    check('images.img2.url')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image url")
        .isURL()
        .isLength({ max: 1000 })
        .withMessage("Please provide a valid image url"),
    check('images.img3.url')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image url")
        .isURL()
        .isLength({ max: 1000 })
        .withMessage("Please provide a valid image url"),
    check('images.img4.url')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a image url")
        .isURL()
        .isLength({ max: 1000 })
        .withMessage("Please provide a valid image url"),
    // handleValidationErrors,
    // comment out above because is using Thien way to put validateSpot inside the routes and manage there
];


// ---------------------get all spots---------------------
router.get('/', asyncHandler(async function (req, res) {
    const spots = await Spot.findAll({
        include: Image,
        order: [
            ['createdAt', 'DESC']
        ]
    });
    return res.json(spots)
}))

// ---------------------get one spot---------------------
router.get('/:id(\\d+)', asyncHandler(async function (req, res) {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findOne({
        where: { id: spotId },
        include: [Image, User]
    })
    return res.json(spot);
}))


// ---------------------post one spot ---------------------
router.post('/add', requireAuth, validateSpot, asyncHandler(async function (req, res) {
    // const { address, city, state, country, name, price, zipcode, description, userId, image1, image2, image3, image4 } = req.body;
    const { oneSpot, images } = req.body;
    // console.log(oneSpot);

    //=======================
    const validateErrors = validationResult(req);  // see comment in put, same
    if (validateErrors.isEmpty()) {
    //=======================
        const spot = await Spot.create(oneSpot);
    //---------------------------------------------
        const newImg1 = {
            spotId: spot.id,
            url: images.img1.url
        }
        await Image.create(newImg1)
    //---------------------------------------------
        const newImg2 = {
            spotId: spot.id,
            url: images.img2.url
        }
        await Image.create(newImg2)
    //---------------------------------------------
        const newImg3 = {
            spotId: spot.id,
            url: images.img3.url
        }
        await Image.create(newImg3)
    //---------------------------------------------
        const newImg4 = {
            spotId: spot.id,
            url: images.img4.url
        }
        await Image.create(newImg4)
    //---------------------------------------------
        res.json(spot)

     //=======================
    } else {
        return res.json(validateErrors)
        //res.sendStatus(500);
    }
    //=======================
}))


// ---------------------update one spot ---------------------
router.put('/:id(\\d+)/edit', requireAuth, validateSpot, asyncHandler(async function (req, res) {
    const spotId = parseInt(req.params.id, 10);
    const spotToUpdate = await Spot.findByPk(spotId);
    const { oneSpot, images } = req.body;

    const validateErrors = validationResult(req);  // is to put validateSpot erros inside
    if (validateErrors.isEmpty()) {
        await spotToUpdate.update(oneSpot);
        // console.log("i'm images", images)
        const newImg1 = {
            id: images.img1.id,
            spotId,
            url: images.img1.url
        }
        const img1 = await Image.findByPk(images.img1.id,)
        await img1.update(newImg1)
        //---------------------------------------------
        const newImg2 = {
            id: images.img2.id,
            spotId,
            url: images.img2.url
        }
        const img2 = await Image.findByPk(images.img2.id)
        await img2.update(newImg2)
        //---------------------------------------------

        const newImg3 = {
            id: images.img3.id,
            spotId,
            url: images.img3.url
        }
        const img3 = await Image.findByPk(images.img3.id,)
        await img3.update(newImg3)
        //---------------------------------------------
        const newImg4 = {
            id: images.img4.id,
            spotId,
            url: images.img4.url
        }
        const img4 = await Image.findByPk(images.img4.id,)
        await img4.update(newImg4)
        //---------------------------------------------
        const spot = await Spot.findByPk(spotId, { include: Image });
        res.json(spot)
    } else {
        res.json(validateErrors)
        //res.sendStatus(500);
    }
}))

// ---------------------delete one spot ---------------------
router.delete('/:id(\\d+)', asyncHandler(async function (req, res) {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findByPk(spotId);
    await Image.destroy({
        where: { spotId }
    })
    await spot.destroy();
    return res.json({})
}))

module.exports = router;
