const request = require('supertest');
const app = require('../../index.js');
const Account = require('../../models/accountModel.js');
const bcrypt = require('bcrypt');

// Mock Account and bcrypt
jest.mock('../../models/accountModel.js');
jest.mock('bcrypt');

describe('Integration Test - Account Login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should respond with a 200 status code for valid credentials', async () => {
        // Mock Account and bcrypt behaviors
        Account.findOne.mockResolvedValue({
        email: 'angel@email.com',
        password: '123qwe123', // Simulated hashed password
        });
        bcrypt.compare.mockResolvedValue(true); // Simulate password match

        const response = await request(app).post('/account/login').send({
        email: 'angel@email.com',
        password: '123qwe123',
        });

        expect(response.statusCode).toBe(200); // Expect success
        expect(response.body).toEqual(expect.objectContaining({
            accessToken: expect.any(String), // Match camelCase "accessToken"
          }));

    });

    
    test('should respond with a 401 status code for invalid credentials', async () => {
        // Mock Account and bcrypt behaviors
        // Simulate that the email exists in the database
        Account.findOne.mockResolvedValue({
          email: 'angel@email.com',
          password: 'hashedPassword123', // Simulated hashed password
        });
      
        // Simulate bcrypt.compare returning false for a wrong password
        bcrypt.compare.mockResolvedValue(false);
      
        const response = await request(app).post('/account/login').send({
          email: 'angel@email.com',
          password: 'wrongPassword', // Wrong password
        });
      
        expect(response.statusCode).toBe(401);
        // Optionally, assert the error message returned
        expect(response.body).toEqual({
          message: 'Invalid email or password',
        });
      });

      test('should respond with a 401 status code for non-existent email', async () => {
        Account.findOne.mockResolvedValue(null); // Simulate no account found
      
        const response = await request(app).post('/account/login').send({
          email: 'nonexistent@email.com',
          password: 'anyPassword',
        });
      
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({
          message: 'Invalid email or password',
        });
      });

      test('should respond with a 500 status code for unexpected errors', async () => {
        Account.findOne.mockRejectedValue(new Error('Database error')); // Simulate a database error
      
        const response = await request(app).post('/account/login').send({
          email: 'angel@email.com',
          password: 'anyPassword',
        });
      
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
          message: 'Database error',
        });
      });

});