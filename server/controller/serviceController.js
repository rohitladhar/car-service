const Service = require('../models/services')
const { validationResult } = require('express-validator');
const Booking = require('../models/booking')
exports.createService = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const extractedErrors = []
            errors.array({ onlyFirstError: true })
                .map(err => extractedErrors.push({ [err.param]: err.msg }));
                res.status(400).json({error:extractedErrors})
        }
        else {
            const match = await Service.findOne({
                email: req.body.email,
                date: req.body.date
            })
            if (match) {
                emptyResult = {name:'Duplicate Entry is not allowed',phone:'',engine:'',_id:333,__v:0}
                res.status(400).json({error:[emptyResult]})
                
            }
            else {
                const service = await Service.create({
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    engine: req.body.engine,
                    date: req.body.date
                })
                const serviceSaved = await service.save()
                if (serviceSaved) {
                    dateString = "T00:00:00.000Z"
                    dateModified = req.body.date+dateString
                    const booking = await Booking.findOne({
                        date:dateModified
                    })
                    
                    if(booking){
                        booking.date = dateModified
                        booking.available = booking.available-1
                        booking.booked = booking.booked+1
                        const bookingUpdate = await booking.save()
                       
                        if(bookingUpdate){
                            
                            res.json({
                                success:'Your request for service is saved.'
                            });
                        }
                        else{
                            res.status(500).send("Internal Server Error")
                        }
                    }
                }
                else {
                    res.status(401).send("service request is not saved")
                }
            }
        }

    }
    catch (err) {
        res.status(500).send("Internal Server Error")
    }
}

exports.viewBooking = async (req, res) => {
    try {
            const statusService = await Service.findOne({
                email: req.params.email,
                date: req.params.date
            })
            if (statusService) {
                res.json({
                    status: statusService.status
                })
            }
            else {
                res.json({status:"Not Found"})
            }
        }
    
    catch (err) {
        res.status(500).send("Internal Server Error")
    }
}

exports.serviceStatus = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findById(serviceId)
        if (service) {
            service.status = req.body.status
            const servicestatus = await service.save()
           
            if (servicestatus) {
                res.status(200).json({result:'Success'})
            }
            else {
                res.status(406).json({result:'Failed'})
            }

        }
        else {
            res.status(404).send({ errors: "not found" })
        }

    }
    catch (err) {
        res.status(500).send("Internal Server Error")
    }
}

exports.getServices = async(req,res)=>{
    try {
        const dateStart = req.params.date;
        const result = await Service.find( { date: dateStart } )
        const resultObject = Object.keys(result).length;
        
        if (resultObject!==0) {
            res.json({ results:result })
        }
        else if(resultObject===0){
            
            res.status(400).json({errors:'No Booking Yet'})
        }
        else {
            res.status(404).send({ errors: 'Not Found' })
        }
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }

}
