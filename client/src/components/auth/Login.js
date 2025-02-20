import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { login } from '../../api';

export default function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            setToken(response.data.token);
            localStorage.setItem('username', username);
        } catch (error) {
            setError('Login failed. Check your username and password.');
        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Login</h2>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid size={12}>
                    <TextField
                        id="username-input" 
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        id="password-input" 
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                {error && 
                    <Grid size={12}>
                        <p style={{ color: 'red' }}>{error}</p>
                    </Grid>
                
                }
                <Grid size={12}>
                    <Button 
                        id="login-btn"
                        variant="contained" 
                        onClick={handleLogin} 
                        onKeyDown={e => e.key === 'Enter' ? handleLogin: ''}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid size={12}>
                    <a href={`/register`}>Need an account?</a>
                </Grid>
            </Grid>
        </Container>
    );
}