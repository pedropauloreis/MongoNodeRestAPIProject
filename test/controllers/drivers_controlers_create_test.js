const request = require('supertest');
const {expect} = require('chai');
const app = require('../../src/app');

const mongoose = require('mongoose');
const Driver = mongoose.model('driver');


describe('Test Driver Controller Create', () => {


    it('has a route handler listening to /api/drivers for post requests', async () => {
        const response = await request(app)
            .post('/api/drivers')
            .send({});
        
        expect(response.status).not.equal(404);
     
    });

    it('POST request to /api/drivers requires an email', async () => {

        await request(app).post('/api/drivers').send()
            .expect(400);

    });


    it('POST request to /api/drivers creates a new driver', async () => {

        const count1 = await Driver.count();

        await request(app).post('/api/drivers').send({email: 'email@email.com'})
            .expect(201);

        const count2 = await Driver.count();
        expect(count2).to.equal(count1+1);
    });

   
});