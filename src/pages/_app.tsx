import { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { parseCookies } from 'nookies';

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const { 'loggedUser': isLoggedIn } = parseCookies();
    
        if (isLoggedIn) {
          if (router.pathname === '/') {
            router.push('/dashboard');
          }
        } else {
          router.push('/');
        }
      }, []);

    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp;