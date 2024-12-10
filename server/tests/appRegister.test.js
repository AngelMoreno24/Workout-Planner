const request = require('supertest');
const app = require('../index'); // Import the Express app
const Account = require('../models/accountModel'); // Mock the Account model
const bcrypt = require('bcrypt');

// Mock Account and bcrypt
jest.mock('../models/accountModel');
jest.mock('bcrypt');

describe('Integration Test - Account Registration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new account successfully', async () => {
    // Mock bcrypt.hash and Account.create
    bcrypt.hash.mockResolvedValue('hashedpassword123');
    Account.findOne.mockResolvedValue(null); // Email not registered
    Account.create.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword123',
    });

    const res = await request(app)
      .post('/account/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword123',
    });
    expect(Account.findOne).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(Account.create).toHaveBeenCalled();
  });

  it('should return 400 if the email is already registered', async () => {
    Account.findOne.mockResolvedValue({ email: 'jane.doe@example.com' }); // Email already exists

    const res = await request(app)
      .post('/account/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      });

    // Assertions
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Email already registered' });
  });

  it('should return 500 if an error occurs', async () => {
    Account.findOne.mockRejectedValue(new Error('Database error')); // Simulate error

    const res = await request(app)
      .post('/account/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'error.email@example.com',
        password: 'password123'
      });

    // Assertions
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Database error' });
  });
});