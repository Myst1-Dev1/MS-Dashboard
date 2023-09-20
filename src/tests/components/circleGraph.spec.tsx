import { CircleGraph } from '../../pages/dashboard/CircleGraph/circleGraph';
import { screen, render } from '@testing-library/react';

describe('circleGraph Component', () => {
    it('renders correctly', () => {
        render(
        <CircleGraph>
            70%
        </CircleGraph>
        )
        
        expect(screen.getByRole('heading')).toHaveTextContent('70%');
    })
})