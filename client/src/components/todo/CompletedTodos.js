// src/components/Todo/TodoList.js
import React, { useEffect, useState, useCallback } from 'react';
import { Container } from '@mui/material';
import TodoItem from './TodoItem';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { getTodos } from '../../api';

export default function Completed({ token }) {
    const [todos, setTodos] = useState([]);

    const fetchTodos = useCallback(async () => {
        const response = await getTodos(token);
        const todosCompleted = response.data.filter(f => f.completedAt != null);
        setTodos(todosCompleted);
    }, [token]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <Container >
            <Grid display="flex" container spacing={2} alignItems="center" justifyContent="center">
                <Grid size={8}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" id="todo_table">
                            <TableBody>
                            {todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} token={token} fetchTodos={fetchTodos} showCompleted={true} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}
