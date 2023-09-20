import AuthContext from '../../contexts/AuthContext';
import { SideBar } from '../../components/Sidebar';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { handleOpenMenu } from '../../components/Sidebar/SideBarUtils';

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

describe('Sidebar component', () => {
    it('renders correctly', () => {
        render(<SideBar />);

        expect(screen.getByText('MS Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Principal')).toBeInTheDocument();
        expect(screen.getByText('Painel')).toBeInTheDocument();
    });

    it('logout when button is clicked', () => {

        const signOutMocked = jest.fn();

        const mockAuthContext:any = {
            signOut:signOutMocked
        }

        render(
        <AuthContext.Provider value={mockAuthContext}>
            <SideBar />
        </AuthContext.Provider>
        );

        const logoutButton = screen.getByTestId('logout-button');

        fireEvent.click(logoutButton);

        expect(signOutMocked).toHaveBeenCalled();
    });

    it('open responsive menu function when button is clicked', () => {
        const setStateMock = jest.fn();
        const useStateMock:any = (useState:any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        render(<SideBar />)

        handleOpenMenu(setStateMock);
        const openResponsiveMenuButton = screen.getByTestId('openResponsiveMenu-button');
        fireEvent.click(openResponsiveMenuButton);

        expect(setStateMock).toHaveBeenCalledWith(true);
    });
})