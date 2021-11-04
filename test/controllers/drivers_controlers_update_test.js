const request = require('supertest');
const {expect} = require('chai');
const app = require('../../src/app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');


describe('Test Driver Controller Update', () => {


    it('has a route handler listening to /api/drivers/:driverID for put requests', async () => {
        const response = await request(app)
            .put('/api/drivers/driverID')
            .send({});
        
        expect(response.status).not.equal(404);
     
    });

    it('PUT request to /api/drivers/:driverID requires an valid MonogoDB Id', async () => {

        const response = await request(app).put('/api/drivers/driverID').send()
            .expect(400);
        
        expect(response.body.errors[0].message).to.equal('A valid driverID param is required');
    });

    it('PUT request to /api/drivers/:driverID requires an email', async () => {

        const driverID = mongoose.Types.ObjectId().toHexString();
        const response = await request(app).put(`/api/drivers/${driverID}`).send()
            .expect(400);
        
        expect(response.body.errors[0].message).to.equal('email is required');
    });

    it('PUT request to /api/drivers:driverID does not update inexistent driver', async () => {
        const driverID = mongoose.Types.ObjectId().toHexString();
        await request(app).put(`/api/drsivers/${driverID}`).send({email: 'newemail@email.com'})
            .expect(404);

    });

    it('PUT request to /api/drivers:driverID  updates a driver', async () => {
        const driver = new Driver({email: 'email@email.com'});
        await driver.save();
        
        const response = await request(app).put(`/api/drivers/${driver._id.toHexString()}`).send({email: 'newemail@email.com',driving: true})
            .expect(200);

        const newDriver = await Driver.findById(driver._id);
        expect(newDriver.email).to.equal('newemail@email.com');
        expect(newDriver.driving).to.be.true;
    });

   
});