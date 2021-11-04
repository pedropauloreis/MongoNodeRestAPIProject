const express = require('express');
const driverRouter = require('./routes/driver_routes');
const setDateTime = require('./middlewares/setDateTimeRequest');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');
const app = express();



app.use(setDateTime);
app.use(express.json()); 

app.use(driverRouter);


app.all('*', (req,res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;