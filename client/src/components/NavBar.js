import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [username, setUsername] = useState('');

    const handleLogout = async (e) => {
        try {
            // Clear token from localStorage
            localStorage.removeItem('token');

            // Redirect to the login page
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        setUsername(localStorage.getItem('username')); 
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }} marginBottom={4}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ marginRight: 20 }}>
                        {username}
                    </Typography>
                    {/* Left-aligned links */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/completed">
                            Completed
                        </Button>
                    </Box>

                    {/* Right-aligned Logout button */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                    
                </Toolbar>
            </AppBar>
        </Box>
    );
}