// src/components/Todo/TodoList.js
import React, { useEffect, useState, useCallback } from 'react';
import { Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import TodoItem from './TodoItem';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { getTodos, addTodo } from '../../api';

export default function TodoList({ token }) {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');

    const fetchTodos = useCallback(async () => {
        const response = await getTodos(token);
        const todosNotCompleted = response.data.filter(f => f.completedAt === null);
        setTodos(todosNotCompleted);
    }, [token]);

    const handleAddTodo = async () => {
        if(title !== "" && priority !== "") {
            await addTodo(title, priority, token);
            setTitle('');
            setPriority('');
            fetchTodos();
        } else {
            window.alert("Title or priority cannot be empty");
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <Container >
            <Grid display="flex" container spacing={2} alignItems="center" justifyContent="center">
                <Grid display="flex" size={8}>
                    <h2>Your Todos</h2>
                </Grid>
                <Grid display="flex" size={8}>
                    <TextField
                        id="input_title"
                        label="Todo Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={8}>
                    <FormControl id="input_priority_form_control" fullWidth>
                        <InputLabel id="input_priority_label">Priority</InputLabel>
                        <Select
                            labelId="priority_select_label"
                            id="priority_select"
                            value={priority}
                            label="Priority"
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                    
                </Grid>
                <Grid size={8}>
                    <Button 
                        variant="contained" 
                        onClick={handleAddTodo} 
                        onKeyDown={e => e.key === 'Enter' ? handleAddTodo: ''}
                    >
                        Add Todo
                    </Button>
                </Grid>
                <Grid size={8}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" id="todo_table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Title</b></TableCell>
                                    <TableCell align="left"><b>Priority</b></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todos.map((todo) => (
                                    <TodoItem key={todo.id} todo={todo} token={token} fetchTodos={fetchTodos} showCompleted={false}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            
        </Container>
    );
}
