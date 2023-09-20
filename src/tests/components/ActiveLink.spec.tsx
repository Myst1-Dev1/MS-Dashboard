import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import styles from './styles.module.scss';
import { ActiveLink } from "../../components/Sidebar/ActiveLink";

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

describe('Active link components', () => {

    it ('renders correctly', () => {
        render(
            <ActiveLink activeClassName={styles.active} href="/" passHref legacyBehavior>
                Início
            </ActiveLink>
        )

        expect(screen.getByText('Início')).toBeInTheDocument();
    })

    it('adds active class if the link is currently active', () => {
        render(
            <ActiveLink activeClassName={styles.active} href="/" passHref legacyBehavior>
                Início
            </ActiveLink>
        )

        expect(screen.getByText('Início')).toHaveClass('active');
    })
})