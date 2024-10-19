// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Completed from './pages/Completed';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    return (
        <Router>
            <Routes>
                {!token ? (
                    <>
                        <Route path="/login" element={<Login setToken={handleSetToken} />} />
                        <Route path="/register" element={<Register setToken={handleSetToken} />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Home token={token} />} />
                        {/* <Route path="/completed" element={<Completed token={token} />} /> */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
