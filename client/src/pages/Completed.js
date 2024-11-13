import React from 'react';
import CompletedTodos from '../components/todo/CompletedTodos';
import NavBar from '../components/NavBar';

export default function Home({ token }) {
    return (
        <div>
            <NavBar />
            <CompletedTodos token={token} />
        </div>
    );
}