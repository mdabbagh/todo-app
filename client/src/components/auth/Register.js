import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { register } from '../../api';

export default function Register({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
            if(password === confirmPassword) {
                const response = await register(username, password);
                setToken(response.data.token);
                localStorage.setItem('username', username);
            } else {
                alert("Password and confirm password must match");
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Register</h2>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid size={12}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={12}>
                    <Button variant="contained" onClick={handleRegister}>
                        Register
                    </Button>
                </Grid>
                <Grid size={12}>
                    <a href={`/login`}>Login</a>
                </Grid>
            </Grid>
        </Container>
    );
}