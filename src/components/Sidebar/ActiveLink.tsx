import Link, { LinkProps } from "next/link";
import styles from './styles.module.scss';

import { ReactElement } from "react";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean;
}

export function ActiveLink({children, 
                            shouldMatchExactHref = false,
                            ...rest}
: ActiveLinkProps) {
    const { asPath } = useRouter();

    let isActive = true;

    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        isActive = false;
    }

    if (!shouldMatchExactHref && 
        (asPath.startsWith(String(rest.href)) || 
         asPath.startsWith(String(rest.as)))) {
            isActive = false;
    }

    return (
        <Link className={isActive ? `${styles.white}` : `${styles.red}`} {...rest}>
            {children}
        </Link>
    )
}