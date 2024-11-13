// src/components/Todo/TodoItem.js
import React from 'react';
import { TableRow, TableCell, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { completeTodo, deleteTodo } from '../../api';

import moment from 'moment';
import 'moment-timezone';

export default function TodoItem({ todo, token, fetchTodos, showCompleted }) {
    const handleComplete = async () => {
        await completeTodo(todo.id, token);
        await fetchTodos();
    };

    const handleDelete = async () => {
        await deleteTodo(todo.id, token);
        fetchTodos();
    }

    return (
        <TableRow key={todo.name}>
            <TableCell align="left">
                {!showCompleted && (
                    <Checkbox checked={todo.completed} onChange={handleComplete} />
                )}
            {todo.title}</TableCell>
            <TableCell align="left">{todo.priority}</TableCell>
            {showCompleted && (
                <TableCell align="left">{moment(todo.completedAt).tz("America/New_York").format("YYYY-MM-DD HH:mm:ss")}</TableCell>
            )}
            <TableCell align="right">
            <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={handleDelete}
            >
                <DeleteIcon />
            </IconButton>
            </TableCell>
        </TableRow>
    );
}
