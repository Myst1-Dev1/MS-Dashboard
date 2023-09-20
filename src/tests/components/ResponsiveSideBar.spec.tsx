import { ResponsiveSideBar } from '../../components/Sidebar/ResponsiveSideBar';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

jest.mock('next/router', () => ({
    useRouter: () => ({
      asPath: '/',
      push:jest.fn()
    }),
}));

describe('ResponsiveSideBar component', () => {
     const setResponsideSideBar = jest.fn;

    it('close side bar when button has clicked ', () => {
        const responsideSideBar = true;

        render(
            <ResponsiveSideBar 
                onResponsiveSideBar = {responsideSideBar}
                onSetResponsiveSideBar={setResponsideSideBar} 
             />
        );

        const closeResponsiveSideBar = screen.getByTestId('close-responsiveSideBar');
        fireEvent.click(closeResponsiveSideBar);

        waitFor(() => {
            return expect(responsideSideBar).toHaveBeenCalledWith(false);
        })
       
    });

    it('redirects to home when logout', () => {
        const responsideSideBar = true;
        const useRouter = jest.spyOn(require('next/router'), 'useRouter')

        render(
            <ResponsiveSideBar 
                onResponsiveSideBar = {responsideSideBar}
                onSetResponsiveSideBar={setResponsideSideBar} 
             />
        );

        const logout = screen.getByTestId('logout-user');
        fireEvent.click(logout);

        waitFor(() => {
            return expect(useRouter).toHaveBeenCalledWith('/');
        })
    })
});