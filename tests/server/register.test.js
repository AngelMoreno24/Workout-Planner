// tests/backend/simpleApp.test.js
const request = require('supertest');
const app = require('../../server'); // Import the app instance

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);  // Should return a 200 OK for the root route
  });
});