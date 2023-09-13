import { useContext } from 'react';
import styles from './styles.module.scss';

import { FaSearch, FaBell, FaEnvelopeOpen } from 'react-icons/fa';
import AuthContext from '../../contexts/AuthContext';

export function Header() {
    const { user } = useContext(AuthContext)

    return (
        <div className={styles.header}>
            <div className={styles.inputBox}>
                <input type="text" placeholder='Pesquisar...' />
                <FaSearch className={styles.icon} />
            </div>
            <div className={styles.userIcons}>
                <FaBell className={styles.icon} />
                <FaEnvelopeOpen className={styles.icon} />
                    {user.map(user => {
                      return (
                        <div key={user.name} className='d-flex gap-3 align-items-center'>
                            <h6 className='mb-0'>{user.name === undefined ? 'John Doe' : user.name}</h6>
                            <div className={styles.userBox}>
                                <img 
                                    src={user.file === undefined ? '/images/userImage.png' : user.file} 
                                    alt="user" 
                                />
                              <div className={styles.userStatus}></div>
                          </div>
                        </div>
                      )
                    })}
            </div>
        </div>
    )
}