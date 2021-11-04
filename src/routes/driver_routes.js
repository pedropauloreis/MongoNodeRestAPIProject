const express = require('express');
const Driver = require('../models/driver');
const validateRequest = require('../middlewares/validate-request');
const {body} = require('express-validator');

const driverRouter = express.Router();

driverRouter.get('/api', async (req, res) => { await res.send({hi: 'there'})});

driverRouter.post('/api/drivers',[
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

module.exports = driverRouter; 
