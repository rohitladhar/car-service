const Booking = require('../models/booking')
const { validationResult } = require('express-validator');

exports.createBooking = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const extractedErrors = []
            errors.array({ onlyFirstError: true })
                .map(err => extractedErrors.push({ [err.param]: err.msg }));
            return res.status(400).json({
                errors: extractedErrors,
            });
        }
        else {
            const entity = await Booking.findOne({
                date: req.body.date,
            })
            if (entity) {
                emptyResult = {available:'Booking Record Already Existed',_id:333,__v:0}
                res.status(400).json({errors:[emptyResult]})
            }
            else {
                const booking = await Booking.create({
                    date: req.body.date,
                    available: req.body.available
                })

                const saved = await booking.save()
                if (saved) {
                    res.json({ results:'Booking Created'})
                }
                else {
                    res.status(401).send({ errors: 'Unable to Created' })
                }
            }
        }
    }
    catch (err) {
        res.status(500).send("internal server error")
    }

}

exports.getBooking = async (req, res) => {
    try {
        const dateStart = req.params.dateStart;
        const dateEnd = req.params.dateEnd
        const result = await Booking.find({ date: { $gte: dateStart, $lte: dateEnd } }).sort({ "date": -1 })
        const resultObject = Object.keys(result).length;
        
        
        if (resultObject!==0) {
            res.json({ results:result })
        }
        else if(resultObject===0){
            emptyResult = {date:'No Record',available:'No Record',booked:'No Record',_id:333,__v:0}
            res.json({results:[emptyResult]})
        }
        else {
            res.status(404).send({ errors: 'Not Found' })
        }
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }

}