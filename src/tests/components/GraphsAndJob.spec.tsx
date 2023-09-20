import { GraphsAndJob } from '../../pages/userProfile/GraphsAndJob';
import { render, screen } from '@testing-library/react';

describe('GraphsAndJob component', () => {
    it('renders correctly', () => {
        render(<GraphsAndJob />)

        expect(screen.getByText('Compatibilidade')).toBeInTheDocument();
        expect(screen.getByText('50%')).toBeInTheDocument();
    });
});