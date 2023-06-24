import styles from './styles.module.scss';

interface PaginationProps {
    onPages:number;
    onSetCurrentPage:React.Dispatch<React.SetStateAction<number>>;
    onCurrentPage:number;
}

export function Pagination({ onPages, onSetCurrentPage }: PaginationProps) {
    return (
        <>
            <div className={styles.pagination}>
                <div className='d-flex gap-3'>
                    {Array.from(Array(onPages), (item ,index) => {
                        return  <button
                                    value={index}
                                    key={index}
                                    onClick={() => onSetCurrentPage(index)}
                                    className={styles.paginationItem}
                                    >
                                        {index + 1}
                                </button>   
                    })}
                </div>
            </div>
        </>
    )
}