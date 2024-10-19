import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { register } from '../../api';

export default function Register({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
            if(password == confirmPassword) {
                await register(username, password);
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
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleRegister}>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}