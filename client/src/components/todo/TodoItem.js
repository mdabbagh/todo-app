// src/components/Todo/TodoItem.js
import React from 'react';
import { TableRow, TableCell, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { completeTodo, deleteTodo } from '../../api';

export default function TodoItem({ todo, token, fetchTodos }) {
    const handleComplete = async () => {
        await completeTodo(todo.id, token);
        fetchTodos();
    };

    const handleDelete = async () => {
        await deleteTodo(todo.id, token);
        fetchTodos();
    }

    return (
        <TableRow key={todo.name}>
              <TableCell align="left">
                 <Checkbox checked={todo.completed} onChange={handleComplete} />
                {todo.title}</TableCell>
              <TableCell align="left">{todo.priority}</TableCell>
              <TableCell align="right">
                <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onChange={handleDelete}
                >
                    <DeleteIcon />
                </IconButton>
              </TableCell>
        </TableRow>
    );
}
