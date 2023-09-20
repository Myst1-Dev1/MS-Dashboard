import CreateUser from '../../pages/users/create';
import { render, screen } from '@testing-library/react';

jest.mock('firebase/auth');
jest.mock('next/router', () => ({
    useRouter: () => ({
      asPath: '/'
    }),
}));

describe('CreateUser page', () => {
    it('renders correctly', () => {
        render(<CreateUser />)

        expect(screen.getByText('Enviar')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('johndoe@gmail.com')).toBeInTheDocument();
    });
})