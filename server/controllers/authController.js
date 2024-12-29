const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = async (req, res) => {
    const { username, password } = req.body;

    // Check request includes both a username and password
    if (!username || !password) {
        return res.status(400).send('Please enter all fields');
    }

    try {
        // Ensure the /todos path exists
        try {
            await db.getData("/todos");
        } catch (error) {
            // Initialize /todos if it doesn't exist
            await db.push("/todos", {});
        }
        
        // Check if user exists before creating
        const users = await db.getData("/users");
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            return res.status(400).send('User already exists');
        }

        // Hash password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: uuidv4(),
            username,
            password: hashedPassword,
        };

        await db.push("/users[]", newUser);
        await db.push(`/todos/${username}`, []);
        const token = jwt.sign({ id: newUser.username }, 'THIS_IS_SECRET_BUT_WE_ARE_NOT_GOING_TO_PROD', { expiresIn: '23h' });
        res.status(201).json({ 'token': token });
    } catch (error) {

    }

    
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const users = await db.getData("/users");

    // Check if user exists
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).send('Invalid credentials or user not found');
    }

    // Check the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).send('Invalid credentials or user not found');
    }

    // Return a new jwt to client
    const token = jwt.sign({ id: user.username }, 'THIS_IS_SECRET_BUT_WE_ARE_NOT_GOING_TO_PROD', { expiresIn: '23h' });
    res.status(201).json({ token });
};

module.exports = { register, login };
