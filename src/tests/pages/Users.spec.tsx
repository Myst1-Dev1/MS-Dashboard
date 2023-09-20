import Users, { getServerSideProps } from '../../pages/users';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('firebase/auth');
jest.mock('next/router', () => ({
    useRouter: () => ({
      asPath: '/'
    }),
}));

const data:any = [{
    id:'A2',
    file:'/images/userImage.png',
    name:'Lorem ipsum',
    email:'lorem@gmail.com',
    phone:'24 5785 5478',
    nacionality:'Americano'
}]

describe('Users page', () => {
    it('renders correctly', () => {
        render(<Users data={data} />)

        expect(screen.getByText('+ Adicionar novo usuário')).toBeInTheDocument();
        expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
    });

    it('send to create users page when click on button',() => {
        const useRouter = jest.spyOn(require('next/router'), 'useRouter')
        render(<Users data={data} />)

        const button = screen.getByText('+ Adicionar novo usuário');
        fireEvent.click(button);

        waitFor(() => {
            return expect(useRouter).toHaveBeenCalledWith('/users/create');
        })
    });

    // it('renders ssr user data', async () => {
    //     render(<Users data={data} />)

    //     const response = await getServerSideProps({
    //         params: {data: data}
    //     } as any);

    //     expect(response).toEqual(
    //         expect.objectContaining({
    //             data: {
    //                 id:'A2',
    //                 file:'/images/userImage.png',
    //                 name:'Lorem ipsum',
    //                 email:'lorem@gmail.com',
    //                 phone:'24 5785 5478',
    //                 nacionality:'Americano'
    //             }
    //         }));
    // });
});