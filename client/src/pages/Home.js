import React from 'react';
import TodoList from '../components/todo/TodoList';
import NavBar from '../components/NavBar';

export default function Home({ token }) {
    return (
        <div>
            <NavBar />
            <TodoList token={token} />
        </div>
    );
}