import { Summary } from '../../components/Summary';
import { screen, render } from '@testing-library/react';

describe('Summary component', () => {
    it('renders correctly', () => {
        render(<Summary />)

        expect(screen.getByText('Usuários')).toBeInTheDocument();
        expect(screen.getByText('Produtos')).toBeInTheDocument();
        expect(screen.getByText('Pedidos')).toBeInTheDocument();
        expect(screen.getByText('Ganhos')).toBeInTheDocument();
    })
})