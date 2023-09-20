import Link , { LinkProps } from 'next/link'
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
    children:ReactNode;
    shouldMatchExactHref?:boolean;
    activeClassName:string
}

export function ActiveLink({children, shouldMatchExactHref ,activeClassName, ...rest}:ActiveLinkProps) {
    const { asPath } = useRouter();


    let isActive = false;

    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        isActive = true;
    }

    if (
        !shouldMatchExactHref &&
        (asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.href)))
    ) {
        isActive = true;
    }

    return (
        <Link legacyBehavior {...rest}>
            <a className={isActive ? activeClassName : ''}>{children}</a>
        </Link>
    )
}