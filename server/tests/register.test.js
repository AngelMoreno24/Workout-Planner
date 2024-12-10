const { register } = require('../controllers/accountController.js'); // Adjust the path
const Account = require('../models/accountModel.js');
const bcrypt = require('bcrypt');
// Mock the Account model
jest.mock('../models/accountModel');

// Mock bcrypt
jest.mock('bcrypt');

describe('Account Controller - Register', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should create a new account successfully', async () => {
    // Mock request and response objects
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    // Mock Account.findOne to return null (no account exists with the given email)
    Account.findOne.mockResolvedValue(null);

    // Mock bcrypt.hash to return a hashed password
    bcrypt.hash.mockResolvedValue('hashedpassword123');

    // Mock Account.create to return the newly created account
    Account.create.mockResolvedValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword123',
    });

    // Call the register function
    await register(req, res);

    // Assertions
    expect(Account.findOne).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(Account.create).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword123',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword123',
    });
  });

  it('should return 400 if the email is already registered', async () => {
    const req = {
      body: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock Account.findOne to return an existing account
    Account.findOne.mockResolvedValue({ email: 'jane.doe@example.com' });

    await register(req, res);

    // Assertions
    expect(Account.findOne).toHaveBeenCalledWith({ email: 'jane.doe@example.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Email already registered' });
  });

  it('should handle errors and return 500 status code', async () => {
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'error.email@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock Account.findOne to throw an error
    Account.findOne.mockRejectedValue(new Error('Database error'));

    await register(req, res);

    // Assertions
    expect(Account.findOne).toHaveBeenCalledWith({ email: 'error.email@example.com' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Database error' });
  });
});