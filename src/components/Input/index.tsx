import styles from './styles.module.scss';

export function Input({...props}) {
    return (
        <input data-testid="inputComponent" className={styles.Input} {...props} />
    )
}