
import styles from './menu-link.module.css';
import Link from "next/link";


export function MenuLink({routeDestination,routeName})  {


        return (
            <Link href={routeDestination}>
                <a className={styles.menuLink}>{routeName}</a>
            </Link>
        )
}

