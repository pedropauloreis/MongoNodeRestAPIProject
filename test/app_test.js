const request = require('supertest');
const {expect} = require('chai');
const app = require('../src/app');


describe('The express app', () => {
    it('handles a GET request to /api', async () => {
        const response = await request(app).get('/api')
        .expect(200);

        expect(response.body.hi).to.equal('there');
    });

   
});