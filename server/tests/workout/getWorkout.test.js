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

    it('should create get workouts successfully', async () => {
        
        const mockWorkouts = [
            {
              category: 'legs',
              name: 'Back Squats',
              sets: '5',
              reps: '15',
              weight: '30',
              time: '15',
            },
        ];
    
    
        // Mock req.id (simulate the middleware setting it)
        Workout.where.mockReturnValue({
        equals: jest.fn().mockResolvedValue(mockWorkouts),
        });

        const testUser = { account: { id: 'mockAccountId', email: 'test@example.com' } };
        const token = jwt.sign(testUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        const res = await request(app)
        .post('/workout/get')
        .set('Authorization', `Bearer ${token}`) // Add the Bearer token header
        .send();
        
        expect(Workout.where().equals).toHaveBeenCalledWith('mockAccountId'); // Ensure equals was called with the mockId
        expect(res.status).toBe(201); // Assert the status
        expect(res.body).toEqual(mockWorkouts); // Assert the response body matches the mock workouts
            
    });

});