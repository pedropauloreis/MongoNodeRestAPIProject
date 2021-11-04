const express = require('express');
const mongoose = require('mongoose');
const Driver = require('../models/driver');
const validateRequest = require('../middlewares/validate-request');
const NotFoundError = require('../errors/not-found-error');
const {body,param} = require('express-validator');

const driverRouterCreate = express.Router();


driverRouterCreate.post('/api/drivers',[
    body('email')
            .not()
            .isEmpty()
            .withMessage('email is required'),
    ] , validateRequest, async (req,res) => {
    
    const driverProps = req.body;

    const driver = await Driver.create(driverProps);
    driver.save();

    res.status(201).send(driver);

});

module.exports = driverRouterCreate; 
