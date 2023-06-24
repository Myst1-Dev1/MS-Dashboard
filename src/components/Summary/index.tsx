import styles from './styles.module.scss';

import { FaUser, FaShoppingCart, FaShapes, FaCoins } from 'react-icons/fa'

export function Summary() {
    return (
        <div className={styles.summary}>
            <div className={styles.summaryBox}>
                <div className='d-flex gap-4 mb-3'>
                    <div className={styles.userBox}>
                        <FaUser className={styles.userIcon} />
                    </div>
                    <div className='mt-2'>
                        <h4>Usuários</h4>
                        <h4>400</h4>
                    </div>
                </div>
                <div className={styles.report}>
                    <p><span>+33%</span> em relação à semana passada</p>
                </div>
            </div>
            <div className={styles.summaryBox}>
                <div className='d-flex gap-4 mb-3'>
                    <div className={styles.productBox}>
                        <FaShapes className={styles.productIcon} />
                    </div>
                    <div className='mt-2'>
                        <h4>Produtos</h4>
                        <h4>100</h4>
                    </div>
                </div>
                <div className={styles.report}>
                    <p><span>+3%</span> em relação ao último mês</p>
                </div>
            </div>
            <div className={styles.summaryBox}>
                <div className='d-flex gap-4 mb-3'>
                    <div className={styles.orderBox}>
                        <FaShoppingCart className={styles.orderIcon} />
                    </div>
                    <div className='mt-2'>
                        <h4>Pedidos</h4>
                        <h4>100</h4>
                    </div>
                </div>
                <div className={styles.report}>
                    <p><span>+3%</span> em relação ao dia anterior</p>
                </div>
            </div>
            <div className={styles.summaryBox}>
                <div className='d-flex gap-4 mb-3'>
                    <div className={styles.earnBox}>
                        <FaCoins className={styles.earnIcon} />
                    </div>
                    <div className='mt-2'>
                        <h4>Ganhos</h4>
                        <h4>R$ 5600</h4>
                    </div>
                </div>
                <div className={styles.report}>
                    <p>Atualizado hoje</p>
                </div>
            </div>
        </div>
    )
}