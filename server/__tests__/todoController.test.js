jest.mock('../config/db');
const { register, login, addTodo, getTodos, updateTodo } = require('../controllers/todoController');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');  

describe('TodoController', () => {
    beforeAll(() => {
        // Reset database
        db.push('/users', [], true);
        db.push('/todos', {}), true;
    })

    it('should successfully create a new todo', async () => {
        id = uuidv4();
        const req = {user: 'testuser', body: { title: 'test todo' + id, priority: '1' }};

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };

        await addTodo(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({"title": "test todo" + id}))
    })

    it('should successfully get todos', async () => {
        id = uuidv4();
        const req = { user: 'testuser', body: { title: 'test todo' + id, priority: '1' }};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };

        await addTodo(req, res);
        
        const req2 = { user: 'testuser', body: { title: 'test todo' + id, priority: '1' }};
        const res2 = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };

        await getTodos(req2, res2);

        expect(res2.status).toHaveBeenCalledWith(200);

        // Check if the response contains a todo with the correct title
        expect(res2.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    "title": 'test todo' + id
                })
            ])
        );
    })

    it('should successfully update todo', async () => {
        const id = uuidv4();
        const req = { user: 'testuser', body: { title: 'test todo' + id, priority: '1' }};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };

        await addTodo(req, res);
        // Get created todo id to update
        const createdTodo = res.json.mock.calls[0][0];
        const todoId = createdTodo.id;
        
        const req2 = { user: 'testuser', body: { id: todoId, title: 'updated test todo' + id, priority: '2' }};
        const res2 = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };

        await updateTodo(req2, res2);

        expect(res2.status).toHaveBeenCalledWith(200);

        // Check if the response contains a todo with the correct title
        expect(res2.json).toHaveBeenCalledWith(
            expect.objectContaining({
                "title": 'updated test todo' + id,
                "priority": "2"
            })
        );
    })
})