import { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn');
    
        if (isLoggedIn === 'true') {
          if (router.pathname === '/') {
            router.push('/dashboard');
          }
        } else {
          // Redirecionar para a página de login
          router.push('/');
        }

        const oneHour = 60 * 60 * 1000; // 1 hora em milissegundos
        const timeOut = setTimeout(() => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('loggedUser');
          router.push('/');
        }, oneHour);

        // Limpar o timeout quando o componente for desmontado
      return () => clearTimeout(timeOut);
      }, []);

    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp;