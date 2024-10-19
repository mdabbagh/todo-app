import React from 'react';
import TodoList from '../components/todo/TodoList';

export default function Home({ token }) {
    return (
        <div>
            <TodoList token={token} />
        </div>
    );
}