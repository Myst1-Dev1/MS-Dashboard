import { Input } from '../../components/Input';
import { render, screen } from '@testing-library/react';

describe('Input Component', () => {
    it('renders correctly', () => {
        render(<Input />)

        const inputComponent = screen.getByTestId('inputComponent');
        expect(inputComponent).toBeInTheDocument();
    })
})