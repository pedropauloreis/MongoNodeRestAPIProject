const request = require('supertest');
const {expect} = require('chai');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');


describe('Test Driver Controller Get', () => {


    it('has a route handler listening to /api/drivers for get requests', async () => {
        const response = await request(app)
            .get('/api/drivers')
            .send({});
        
        expect(response.status).not.equal(404);
     
    });

    it('POST request to /api/drivers returs drivers collection', async () => {

        const driver1 = new Driver({email: 'email1@email.com'});
        const driver2 = new Driver({email: 'email2@email.com'});
        await driver1.save();
        await driver2.save();
        
        const response = await request(app).get('/api/drivers').send()
            .expect(200);


        expect(response.body.map(e=>(e.email))).to.to.have.members(['email1@email.com','email2@email.com']);

    });


    it('POST request to /api/drivers/:lat/:lng/:maxDistance returs drivers collection', async () => {

        const empirestateDriver =  createDriver('empirestate@email.com', 40.748683332975034, -73.98569912249414);

        const pennstationDriver = createDriver('pennstation@email.com', 40.75052408108183, -73.99469830928217);

        const timessquareDriver = createDriver('timessquare@email.com', 40.758425712992974, -73.98409899577942);

        const batteryparkDriver = createDriver('batterypark@email.com', 40.7030492722342, -74.01556674879234);
        

        const bryantparkLocation = { lat:40.753504925123515, lng:-73.98344985694837}
        const maxDistance = 1000;
         
        const response = await request(app).get(`/api/drivers/${bryantparkLocation.lng}/${bryantparkLocation.lat}/${maxDistance}`).send()
            .expect(200);


        expect(response.body.map(e=>(e.email))).to.to.have.members(['timessquare@email.com','empirestate@email.com']);

    });

    const createDriver = async (email,lat,lng) => {
        const driver = new Driver({
            email: email, 
            geometry: {
                type: 'Point',
                coordinates: [lng,lat]
           }
        });
        driver.save();
        return driver;
    }

   
});