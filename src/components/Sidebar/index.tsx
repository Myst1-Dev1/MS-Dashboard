import styles from './styles.module.scss';

import { MdDashboard } from 'react-icons/md';
import { 
    FaUser,
    FaShoppingBag,
    FaCreditCard,
    FaTruck, 
    FaUserCircle, 
    FaSignOutAlt, 
    FaBars }
    from 'react-icons/fa';
import { ActiveLink } from './ActiveLink';
import { ResponsiveSideBar } from './ResponsiveSideBar';
import { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { destroyCookie } from 'nookies';
import { handleOpenMenu } from './SideBarUtils';

export function SideBar() {
    const { signOut } = useContext(AuthContext);

    const [responsiveSideBar, setResponsiveSideBar] = useState(false);

    function handleLogout() {
        destroyCookie(null, 'loggedUser');
        signOut();
    }

    return (
        <>
            <FaBars
                data-testid="openResponsiveMenu-button" 
                onClick={() => handleOpenMenu(setResponsiveSideBar)} 
                className={styles.activeMenuIcon} 
            />
            <div className={styles.sideBar}>
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
                            <span data-testid="logout-button" 
                                onClick={handleLogout} 
                                className='mb-0'>
                                    Sair
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <ResponsiveSideBar 
                onResponsiveSideBar = {responsiveSideBar}
                onSetResponsiveSideBar = {setResponsiveSideBar} 
            />
        </>
    )
}