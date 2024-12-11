const request = require('supertest');
const app = require('../../index'); // Import the Express app
const Account = require('../../models/accountModel'); // Mock the Account model
const bcrypt = require('bcrypt');
const Workout = require('../../models/workoutModel');

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

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijp7ImVtYWlsIjoiYW5nZWxAZW1haWwuY29tIiwiaWQiOiI2NzU3OWQzZWFkMWQwNTBlNWQ3MmFkMGUifSwiaWF0IjoxNzMzODk0NTA3fQ.YAtkuOa2bNFVuin4M-ca4R09WhjutdLe9l0cVmOoG4M'; // Replace with a valid token

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


        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijp7ImVtYWlsIjoiYW5nZWxAZW1haWwuY29tIiwiaWQiOiI2NzU3OWQzZWFkMWQwNTBlNWQ3MmFkMGUifSwiaWF0IjoxNzMzODk0NTA3fQ.YAtkuOa2bNFVuin4M-ca4R09WhjutdLe9l0cVmOoG4M'; // Replace with a valid token

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