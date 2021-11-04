const express = require('express');
require('express-async-errors');
const driverRouterGet = require('./routes/driver_route_get');
const driverRouterCreate = require('./routes/driver_route_create');
const driverRouterUpdate = require('./routes/driver_route_update');
const driverRouterDelete = require('./routes/driver_route_delete');
const setDateTime = require('./middlewares/setDateTimeRequest');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');
const app = express();



app.use(setDateTime);
app.use(express.json()); 

app.use(driverRouterGet);
app.use(driverRouterCreate);
app.use(driverRouterUpdate);
app.use(driverRouterDelete);


app.all('*', (req,res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
