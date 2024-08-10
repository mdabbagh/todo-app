const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

const addTodo = async (req, res) => {
    const { title, priority } = req.body;
    if (!title || !priority) {
        return res.status(400).send('Please enter all fields');
    }

    const userId = req.user; // Get the user ID from the authenticated request
    
    const newTodo = {
        id: uuidv4(),
        title,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        userId: userId
    };

    try {
        // Now push the new todo into the user's todos object
        await db.push(`/todos/${userId}[]`, newTodo, true);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ msg: 'Error adding todo' });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await db.getData(`/todos/${req.user}`);
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).send('No todos found');
    }
};

const updateTodo = async (req, res) => {
    const { id, title, priority } = req.body;

    try {
        const todos = await db.getData(`/todos/${req.user}`);
        const index = todos.findIndex(todo => todo.id === id);
        
        if (index === -1) {
            return res.status(400).send('Todo not found');
        }

        todos[index] = { ...todos[index], title, priority };
        await db.push(`/todos/${req.user}`, todos, true);

        res.status(200).json(todos[index]);
    } catch (error) {
        res.status(400).send('Error updating todo');
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        let todos = await db.getData(`/todos/${req.user}`);
        todos = todos.filter(todo => todo.id !== id);
        await db.push(`/todos/${req.user}`, todos, true);

        res.status(200).send('Todo deleted');
    } catch (error) {
        res.status(400).send('Error deleting todo');
    }
};

const completeTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todos = await db.getData(`/todos/${req.user}`);
        const index = todos.findIndex(todo => todo.id === id);

        if (index === -1) {
            return res.status(400).send('Todo not found');
        }

        todos[index] = { ...todos[index], completed: true, completedAt: new Date().toISOString() };
        await db.push(`/todos/${req.user}`, todos, true);

        res.json(todos[index]);
    } catch (error) {
        res.status(400).send('Error completing todo');
    }
};

const getCompletedTodos = async (req, res) => {
    try {
        const todos = await db.getData(`/todos/${req.user}`);
        const completedTodos = todos.filter(todo => todo.completed);
        res.status(200).json(completedTodos);
    } catch (error) {
        res.status(400).send('No todos found');
    }
};

module.exports = { addTodo, getTodos, updateTodo, deleteTodo, completeTodo, getCompletedTodos };
