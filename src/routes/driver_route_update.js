const express = require('express');
const mongoose = require('mongoose');
const Driver = require('../models/driver');
const validateRequest = require('../middlewares/validate-request');
const NotFoundError = require('../errors/not-found-error');
const {body,param} = require('express-validator');

const driverRouterUpdate = express.Router();

driverRouterUpdate.put('/api/drivers/:driverID',[
    param('driverID')
            .not()
            .isEmpty()
            .custom((input) => mongoose.Types.ObjectId.isValid(input) )
            .withMessage('A valid driverID param is required'),
    body('email')
            .not()
            .isEmpty()
            .withMessage('email is required'),
    ] , validateRequest, async (req,res) => {
    
    const driver = await Driver.findById(req.params.driverID);
    let {email, driving} = req.body;

    if(!driver)
        throw new NotFoundError();

    if(!driving)
        driving = false;

    driver.set({email, driving});
    await driver.save();
    
    res.status(200).send(driver);

});


module.exports = driverRouterUpdate; 
