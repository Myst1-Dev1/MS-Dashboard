import styles from './styles.module.scss';

import { MdDashboard } from 'react-icons/md';
import { 
    FaUser,
    FaShoppingBag,
    FaCreditCard,
    FaTruck, 
    FaUserCircle, 
    FaSignOutAlt, 
    FaTimes }
    from 'react-icons/fa';
import { ActiveLink } from './ActiveLink';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface ResponsiveSideBarProps {
    onResponsiveSideBar:boolean;
    onSetResponsiveSideBar:Dispatch<SetStateAction<boolean>>;
}

export function ResponsiveSideBar({ onResponsiveSideBar, onSetResponsiveSideBar }: ResponsiveSideBarProps) {
    const router = useRouter()

    function handleLogout() {
        localStorage.removeItem('isLoggedIn');
        router.push('/');
    }

    function handleCloseMenu() {
        onSetResponsiveSideBar(false);
    }
    useEffect(() => {
        const handleRouteChange = () => {
            onSetResponsiveSideBar(false);
        };
    
        if (router && router.events) {
            router.events.on('routeChangeComplete', handleRouteChange);
    
            return () => {
                router.events.off('routeChangeComplete', handleRouteChange);
            };
        }
    }, [router]);
    
    return (
        <>
            {onResponsiveSideBar && (
                <div className={styles.responsiveSideBar}>   
                    <FaTimes
                        data-testid="close-responsiveSideBar"
                        onClick={handleCloseMenu} 
                        className={styles.closeMenuIcon} 
                    />
                    <h1 className='mb-5'>MS Dashboard</h1>
                    <div className='d-flex flex-column gap-5'>
                        <div className={styles.navItem}>
                            <h5 className='mb-3'>Principal</h5>
                                <ActiveLink activeClassName={styles.active} href="/dashboard" passHref>
                                    <div className='d-flex align-items-center gap-2'>
                                        <MdDashboard />
                                            <span className='mb-0'>Painel</span>
                                    </div>
                                </ActiveLink>
                        </div>

                        <div className={styles.navItem}>
                            <h5 className='mb-3'>Listas</h5>
                            <ActiveLink activeClassName={styles.active} href="/users" passHref>
                                <div className='d-flex align-items-center gap-2 mb-3'>
                                    <FaUser />
                                    <span className='mb-0'>Usuários</span>
                                </div>
                            </ActiveLink>
                            <div className='d-flex align-items-center gap-2 mb-3'>
                                <FaShoppingBag />
                                <span className='mb-0'>Produtos</span>
                            </div>
                            <div className='d-flex align-items-center gap-2 mb-3'>
                                <FaCreditCard />
                                <span className='mb-0'>Pedidos</span>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <FaTruck />
                                <span className='mb-0'>Entregas</span>
                            </div>
                        </div>

                        <div className={styles.navItem}>
                            <h5 className='mb-3'>Usuário</h5>
                            <ActiveLink activeClassName={styles.active} href="/userProfile" passHref>
                                <div className='d-flex align-items-center gap-2 mb-3'>
                                    <FaUserCircle />
                                    <span className='mb-0'>Perfil</span>
                                </div>
                            </ActiveLink>
                            <div className='d-flex align-items-center gap-2'>
                                <FaSignOutAlt />
                                <span data-testid="logout-user" 
                                    onClick={handleLogout} 
                                    className='mb-0'>
                                        Sair
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    )
}