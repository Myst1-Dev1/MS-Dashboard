import { Pagination } from '../../components/Pagination';
import { render, screen } from '@testing-library/react';

describe('Pagination component', () => {

    const currentPage = 1;
    const pages = 1;
    const setCurrentPage = jest.fn();

    it('renders correctly', () => {
        render(
                <Pagination 
                    onCurrentPage={currentPage} 
                    onPages={pages}
                    onSetCurrentPage={setCurrentPage} 
                />)
         
        const pagesNumber = [1];
                
        expect(screen.getAllByTestId('buttonPagination')).toHaveLength(pages);
        expect(pagesNumber.length).toBe(pages);  
    })
})