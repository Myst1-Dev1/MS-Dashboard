import { Footer } from '../../components/Footer';
import { render, screen } from '@testing-library/react';

describe('Footer Component', () => {
    it('renders  correctly', () => {
        render(<Footer />)

        expect(screen.getByText('© 2023 Feito com ❤ por')).toBeInTheDocument();
        expect(screen.getByText('Myst1 Dev')).toBeInTheDocument();
    })
})