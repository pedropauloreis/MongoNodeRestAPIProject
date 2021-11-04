const express = require('express');
const mongoose = require('mongoose');
const Driver = require('../models/driver');
const validateRequest = require('../middlewares/validate-request');
const NotFoundError = require('../errors/not-found-error');
const {body,param} = require('express-validator');

const driverRouterGet = express.Router();

driverRouterGet.get('/api', async (req, res) => { await res.send({hi: 'there'})});

driverRouterGet.get('/api/drivers', async (req,res) => {
    
    const drivers = await Driver.find({});
    res.status(200).send(drivers);

});

driverRouterGet.get('/api/drivers/:lng/:lat/:maxDistance', async (req,res) => {
    
    const {lng,lat,maxDistance} = req.params;
    const drivers = await Driver.aggregate([{
        '$geoNear': {
            'near': {
                'type': 'Point',
                'coordinates': [parseFloat(lng), parseFloat(lat)]
            },
        'spherical': true,
        'distanceField': 'dist',
        'maxDistance': parseFloat(maxDistance)
        }
    }]);

    res.status(200).send(drivers);

});


module.exports = driverRouterGet; 
