const express = require('express');
const mongoose = require('mongoose');
const Driver = require('../models/driver');
const validateRequest = require('../middlewares/validate-request');
const NotFoundError = require('../errors/not-found-error');
const {body,param} = require('express-validator');

const driverRouterDelete = express.Router();



driverRouterDelete.delete('/api/drivers/:driverID',[
    param('driverID')
            .not()
            .isEmpty()
            .custom((input) => mongoose.Types.ObjectId.isValid(input) )
            .withMessage('A valid driverID param is required'),
    ] , validateRequest, async (req,res,next) => {
    
    try{
        const driver = await Driver.findById(req.params.driverID);

        if(!driver)
            throw new NotFoundError();
    
      
        await driver.remove();
        
        res.status(204).send();
    }
    catch(err){
        next(err);
    }
    

});

module.exports = driverRouterDelete; 
