import React from 'react';
import AuthContext from '../../contexts/AuthContext';
import UserProfile from '../../pages/userProfile';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('firebase/auth');
jest.mock('../../pages/userProfile/ChartGainUserGraph');
jest.mock('next/router', () => ({
    useRouter: () => ({
      asPath: '/'
    }),
}));

describe('UserProfile page', () => {
    it('renders user data correctly', () => {
        const user = [
            {
                name:'John Doe',
                age:'25',
                file: '/images/userImage.png'
            }
        ]

        const mockAuthContext:any = {
            user: user
        }

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <UserProfile />
            </AuthContext.Provider>
        )
        
        const userName = screen.getByTestId('userName')
        const age = screen.getByTestId('age');

        expect(userName).toHaveTextContent('John Doe');
        expect(age).toHaveTextContent('Idade: 25');
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('open update form when button is clicked', () => {
        const setStateMock = jest.fn();
        const useStateMock:any = (useState:any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        render(<UserProfile />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        waitFor(() => {
            return expect(setStateMock).toHaveBeenCalledWith(true);
        })
    })
});