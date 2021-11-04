const request = require('supertest');
const {expect} = require('chai');
const app = require('../../src/app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');


describe('Test Driver Controller Delete', () => {


    it('has a route handler listening to /api/drivers/:driverID for delete requests', async () => {
        const response = await request(app)
            .delete('/api/drivers/driverID')
            .send({});
        
        expect(response.status).not.equal(404);
     
    });

    it('DELETE request to /api/drivers/:driverID requires an valid MonogoDB Id', async () => {

        const response = await request(app).delete('/api/drivers/driverID').send()
            .expect(400);
        
        expect(response.body.errors[0].message).to.equal('A valid driverID param is required');
    });


    it('DELETE request to /api/drivers:driverID does not delete inexistent driver', async () => {
        const driverID = mongoose.Types.ObjectId().toHexString();
        await request(app).delete(`/api/drsivers/${driverID}`).send()
            .expect(404);

    });

    it('DELETE request to /api/drivers:driverID deletes a driver', async () => {
        
        const driver = new Driver({email: 'email@email.com'});
        await driver.save();

        const newDriver = await Driver.findById(driver._id);
        expect(newDriver).to.not.be.null;
        
        await request(app).delete(`/api/drivers/${driver._id.toHexString()}`).send()
            .expect(204);

        const newDriver2 = await Driver.findById(driver._id);
        expect(newDriver2).to.be.null;
    });

   
});