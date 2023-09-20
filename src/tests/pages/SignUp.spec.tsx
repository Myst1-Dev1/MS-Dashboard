import SignUp from '../../pages/signUp';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('next/router', () => ({
    useRouter: () => ({
      asPath: '/'
    }),
  }));

describe('SignUp Page', () => {
    it('renders correctly', () => {
        render(<SignUp />);

        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();    
    })

    it('redirects correctly to home when have a account', () => {
        const useRouter = jest.spyOn(require('next/router'), 'useRouter')
        
        render(<SignUp />);

        
        const linkToHome = screen.getByTestId('linkToHome');
        fireEvent.click(linkToHome);
       
        waitFor(() => {
            return expect(useRouter).toHaveBeenCalledWith('/');
        })
    })

    it('handles sign up correctly', async () => {
        render(<SignUp />);

        const nameInput = screen.getByPlaceholderText('Nome');
        const emailInput = screen.getByPlaceholderText('E-mail');
        const passwordInput = screen.getByPlaceholderText('Senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme a senha');

        const name = 'John Doe';
        const email = 'Johndoe@gmail.com';
        const password = '123456';

        const button = screen.getByRole('button');

        const useRouter = jest.spyOn(require('next/router'), 'useRouter')

        const mockCreateUserWithEmailAndPassword = createUserWithEmailAndPassword as jest.Mock;
        const res = await mockCreateUserWithEmailAndPassword(auth, email, password);

        const setDocMock = setDoc as jest.Mock;
        fireEvent.click(button);

        waitFor(() => {
            expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
            expect(setDocMock).toHaveBeenCalledWith(doc(db,'loggedUserData', res.user.uid), {
                name, email
            });
            expect(useRouter).toHaveBeenCalledWith('/');
        });

        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(confirmPasswordInput).toHaveValue('');
    });
})