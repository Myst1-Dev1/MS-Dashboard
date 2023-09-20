import AuthContext from '../../contexts/AuthContext';
import Login from '../../pages';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('firebase/auth');
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

describe('Login page', () => {
    it('renders correctly', () => {
        render(<Login />);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    })

    it('login when handleSignIn has been clicked', async () => {
        const signInMock = jest.fn();

        render(
            <AuthContext.Provider value={{
                signIn:signInMock
                } as any}>
                <Login />
            </AuthContext.Provider>
        )

        const emailInput = screen.getByPlaceholderText('E-mail');
        fireEvent.change(emailInput, { target: { value: 'johndoe@gmail.com' } });
        const passwordInput = screen.getByPlaceholderText('Senha');
        fireEvent.change(passwordInput, { target: { value: '123456' } });

        act(() => {
            signInMock(emailInput, passwordInput)

            const submitButton = screen.getByRole('button');
            fireEvent.click(submitButton);
          });

        await waitFor(() => {
            return expect(signInMock).toHaveBeenCalledWith(emailInput, passwordInput);
        })
    })
})