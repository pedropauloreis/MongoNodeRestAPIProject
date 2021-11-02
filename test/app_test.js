const request = require('supertest');
const assert = require('assert');
const app = require('../app');


describe('The express app', () => {
    it('handles a GET request to /api', async () => {
        const response = await request(app).get('/api');
        assert(response.body.hi === 'there');
    })
});