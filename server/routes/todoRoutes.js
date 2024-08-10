const express = require('express');
const { addTodo, getTodos, updateTodo, deleteTodo, completeTodo, getCompletedTodos } = require('../controllers/todoController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addTodo);
router.get('/', auth, getTodos);
router.put('/', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);
router.put('/complete/:id', auth, completeTodo);
router.get('/completed', auth, getCompletedTodos);

module.exports = router;
