
const mongoose = require('mongoose');
const app = require ('./src/app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

app.listen(3050, () => {
    console.log('Runing on port 3050');
});