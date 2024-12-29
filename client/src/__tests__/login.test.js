// React unit test to validate the login form
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/auth/Login';

describe('Login', () => {
    test('renders Login component', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('submits the form', () => {
        render(<Login />);
        const emailInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.click(submitButton);
    });
});