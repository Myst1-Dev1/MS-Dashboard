import AuthContext from "../../contexts/AuthContext";
import { Header } from "../../components/Header";
import { render, screen } from '@testing-library/react';

jest.mock('firebase/auth');

describe('Header component', () => {
    it('renders correctly', () => {
        render(<Header />);

        const inputElement = screen.getByTestId('input-element');
        const bellIcon = screen.getByTestId('bell-icon');
        const envelopeIcon = screen.getByTestId('envelope-icon');

        expect(inputElement).toBeInTheDocument();
        expect(bellIcon).toBeInTheDocument();
        expect(envelopeIcon).toBeInTheDocument();
    });

    it('renders userData correctly', () => {
        const user = [
            {
                name:'John Doe',
                file: '/images/userImage.png'
            }
        ]

        const mockAuthContext:any = {
            user: user
        }

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Header />
            </AuthContext.Provider>
        )

        const image = screen.getByRole('img');

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(image).toBeInstanceOf(HTMLImageElement);
        expect(image.getAttribute('src')).toBe('/images/userImage.png');
    })
})