const express = require('express');
const router = express.Router();
const { signIn, register, emailCheck, forgetPassword } = require('../controller/userController')
const { check } = require('express-validator');
const { createBooking, getBooking } = require('../controller/bookingController')
const { isAdmin, isAuth,isValid } = require('../utils/isAdmin')
const { createService, viewBooking, serviceStatus,getServices } = require('../controller/serviceController')
router
    .post('/register', [
        check('email')
            .not().isEmpty().withMessage('Email Required')
            .isEmail().withMessage('Invalid Email Format'),
        check('password').not().isEmpty().withMessage('Password Required')
            .isLength({ min: 7 })
            .withMessage('Password must be at least 7 chars long'),
        
        check('name').custom((value) => {
            return value.match(/^[A-Za-z ]+$/);
          }).withMessage('Only Alphabets Allowed in Name'),
    ], register)

router

    .post('/signin', [
        check('email')
            .not().isEmpty().withMessage('Email Required')
            .isEmail().withMessage('Invalid Email Format'),
        check('password', 'Password Required').not().isEmpty()

    ], signIn)

router
    .post('/createbooking', isAuth, isAdmin, [
        check('date')
            .not().isEmpty().withMessage('Date Required'),

        check('available').not().isEmpty().withMessage('Available Seat Required')
            .isNumeric().withMessage('Only Number Allowed')

    ], createBooking)

router
    .post('/createservice', isAuth, [
        check('date')
            .not().isEmpty().withMessage('Date Required'),

        check('name').not().isEmpty().withMessage('Name Required')
            .isAlpha().withMessage('Only Albhabets Allowed'),

        check('phone').not().isEmpty().withMessage('Phone Required')
            .isNumeric().withMessage('Only Numeric Allowed in Phone')
            .isLength({ min: 10, max: 10 }).withMessage('Phone Number Should exactly 10 digits'),

        check('email')
            .not().isEmpty().withMessage('Email Required')
            .isEmail().withMessage('invalid format'),

        check('engine')
            .not().isEmpty().withMessage('Engine Type Required')

    ], createService)

router
    .patch('/forget/:token',isValid, forgetPassword)

router
    .get('/statusview/:date/:email', isAuth, viewBooking)

router
    .patch('/servicestatus/:id', isAdmin, isAuth, serviceStatus)

router
    .get('/getbooking/:dateStart/:dateEnd', getBooking)

router
    .get('/getservice/:date',isAdmin,isAuth,getServices)

router
    .get('/checkemail/:email',emailCheck)



module.exports = router