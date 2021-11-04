const {validationResult} = require('express-validator');
const NotFoundError = require('../errors/not-found-error');
const Driver = require('../models/driver');

const getDriver = async (req, res, next) => {
    const driver = await Driver.findById(req.params.driverID);

    if(!driver)
        throw new NotFoundError();

    req.driver = driver;
    next();
}

module.exports = getDriver;