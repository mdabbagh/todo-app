jest.mock('../config/db');
const { register, login } = require('../controllers/authController');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');  

describe('AuthController', () => {
    beforeAll(() => {
        // Reset database
        db.push('/users', []);
    })

    describe('register tests', () => {
        it('should successfully register a new user', async () => {
            id = uuidv4();
            const req = { body: { username: 'test user' + id, password: 'testpassword' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('User registered');
        })
    })

    describe('login tests', () => {
        it('should login successfully with correct username and password', async () => {
            // Add user to database
            const id = uuidv4();
            db.push('/users[]', { id: id, username: 'testuser' + id, password: 'hashedPassword' });

            // Setup req body with credentials
            const req = { body: { username: 'testuser' + id, password: 'password123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn()
            };

            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('jwt');

            // Call login
            await login(req, res);

            // Verify login success
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'jwt' }));
        })
    })
})