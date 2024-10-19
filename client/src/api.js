import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // Token has expired or is invalid, redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const register = async (username, password) => {
    return axios.post(`${API_URL}/auth/register`, { username, password });
}

export const login = async (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password });
}

export const addTodo = async (title, priority, token) => {
    return axios.post(`${API_URL}/todos`, { title, priority }, {
        headers: { Authorization: `Bearer ${token}`}
    });
}

export const updateTodo = async (title, priority, token) => {
    return axios.put(`${API_URL}/todos`, { title, priority }, {
        headers: { Authorization: `Bearer ${token}`}
    });
}

export const getTodos = async (token) => {
    return axios.get(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}`}
    })
}

export const completeTodo = async (id, token) => {
    return axios.put(`${API_URL}/todos/complete/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    });
}

export const getCompletedTodos = async (token) => {
    return axios.get(`${API_URL}/todos/completed`, {
        headers: { Authorization: `Bearer ${token}`}
    });
}

export const deleteTodo = async (id, token) => {
    return axios.delete(`${API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    });
}

