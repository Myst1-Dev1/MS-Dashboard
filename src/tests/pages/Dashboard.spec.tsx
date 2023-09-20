import Dashboard from '../../pages/dashboard';
import { render, screen } from '@testing-library/react';

jest.mock('firebase/auth');
jest.mock('../../pages/dashboard/ChartGraph');
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

describe('Dashboard Page', () => {
    it('renders correctly', () => {
        render(<Dashboard />)
        expect(screen.getByText('Rendimento total')).toBeInTheDocument();
        expect(screen.getByText('Vendas totais feitas hoje')).toBeInTheDocument();
        expect(screen.getByText('Últimos 6 meses(Total de membros)')).toBeInTheDocument();
    })
})