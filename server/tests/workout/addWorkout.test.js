const request = require('supertest');
const app = require('../../index'); // Import the Express app
const Account = require('../../models/accountModel'); // Mock the Account model
const bcrypt = require('bcrypt');
const Workout = require('../../models/workoutModel');
const jwt = require('jsonwebtoken');

// Mock Account and bcrypt
jest.mock('../../models/workoutModel');

describe('Integration Test - Account Registration', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new workout successfully', async () => {
        

        Workout.create.mockResolvedValue({
            category: 'legs',
            name: 'Back Squats',
            sets: '5',
            reps: '15',
            weight: '30',
            time: '15'
        });

        const testUser = { account: { id: 'mockAccountId', email: 'test@example.com' } };
        const token = jwt.sign(testUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        const res = await request(app)
        .post('/workout/add')
        .set('Authorization', `Bearer ${token}`) // Add the Bearer token header
        .send({
            category: 'legs',
            name: 'Back Squats',
            sets: '5',
            reps: '15',
            weight: '30',
            time: '15'
        });

        // Assertions
        expect(res.status).toBe(201);
    
    });

    it('should fail because of missing information', async () => {
        
        Workout.create.mockResolvedValue({
            category: 'legs',
            name: 'Back Squats',
            sets: '5',
            reps: '15',
        });


        const testUser = { account: { id: 'mockAccountId', email: 'test@example.com' } };
        const token = jwt.sign(testUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        const res = await request(app)
        .post('/workout/add')
        .set('Authorization', `Bearer ${token}`) // Add the Bearer token header
        .send({
            category: 'legs',
            name: 'Back Squats',
            sets: '5',
            reps: '15',
        });
        // Assertions
        expect(res.status).toBe(401);

    });
});