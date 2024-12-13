const request = require('supertest');
const app = require('../../index'); // Import the Express app
const Workout = require('../../models/workoutModel');
const jwt = require('jsonwebtoken');

// Mock the Workout model
jest.mock('../../models/workoutModel');

describe('Integration Test - Get Workouts', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should retrieve workouts successfully for a specified accountId', async () => {

        const mockWorkouts = [
            {
                _id: '64fa88b0e5f6780014a4a3c2',
                category: 'legs',
                name: 'Back Squats',
                sets: '5',
                reps: '15',
                weight: '30kg',
                time: '15 minutes',
                createdAt: '2024-12-13T14:20:00.000Z',
            },
        ];


        // Mock Workout.aggregate to return mock data
        Workout.aggregate.mockResolvedValue(mockWorkouts);

        
        const testUser = { account: { id: 'mockAccountId', email: 'test@example.com' } };
        const token = jwt.sign(testUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        const res = await request(app)
        .post('/workout/getDate')
        .set('Authorization', `Bearer ${token}`) // Add the Bearer token header
        .send({ 
            date: '2024-12-13' 
        });
        
        // Assert Workout.aggregate was called with the correct parameters
        expect(Workout.aggregate).toHaveBeenCalledWith([
            {
                $match: {
                    accountId: 'mockAccountId',
                    createdAt: {
                        $gte: new Date('2024-12-13T00:00:00.000Z'),
                        $lt: new Date('2024-12-13T23:59:59.999Z'),
                    },
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);

        // Assert the response
        expect(res.status).toBe(200); // Assert the status
        expect(res.body).toEqual(mockWorkouts); // Assert the response body matches the mock workouts

        });
});
