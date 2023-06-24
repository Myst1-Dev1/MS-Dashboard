import styles from './styles.module.scss';
import { ReactNode } from 'react';

interface CircleGraphProps extends React.HTMLProps<HTMLHeadingElement> {
    children:ReactNode
}

export function CircleGraph({children, ...props}: CircleGraphProps) {
    return (
        <div className={styles.midle}>
            <svg viewBox='0 0 232 232'>
                    <circle cx="50%" cy="50%" r="98.5" opacity="0.1"
                    stroke='#D9d9d9'/>
                <circle 
                    cx="50%"
                    cy="50%"
                    r="98.5"
                    stroke='url(#paint0_linear_201_85)'
                />
                <defs>
                    <linearGradient
                        id='paint0_linear_201_85'
                        x1="-9"
                        y1="82"
                        x2="145"
                            y2="178"
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#22c55e' />
                        <stop offset="1" stopColor='#22c55e' />
                    </linearGradient>
                </defs>
            </svg>
            <div className={styles.content}>
                    <h3 {...props}>{children}</h3>
            </div>
        </div>
    )
}