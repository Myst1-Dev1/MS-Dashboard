import { UpdateFormUser } from '../../pages/userProfile/UpdateFormUser';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

jest.mock('firebase/auth');
jest.mock('next/router', () => ({
    useRouter: () => ({
      asPath: '/'
    }),
}));

const openForm = true;
const setOpenForm = jest.fn();

describe('UpdateFormUser component', () => {
    it('close update form data correctly', () => {
        render(<UpdateFormUser onOpenForm={openForm} onSetOpenForm={setOpenForm} />)

        const closeForm = screen.getByTestId('close-form');
        fireEvent.click(closeForm);

        waitFor(() => {
            return expect(setOpenForm).toHaveBeenCalledWith(false);
        });
        expect(screen.getByText('Atualizar Usuário')).toBeInTheDocument();
    });
});