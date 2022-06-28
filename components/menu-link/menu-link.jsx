
import styles from './menu-link.module.css';
import Link from "next/link";


export function MenuLink({drawerState,routeDestination,routeName})  {

    console.log(drawerState)

        return (
            <Link href={routeDestination} onclick={() => {drawerState = false}}>
                <a className={styles.menuLink}>{routeName}</a>
            </Link>
        )
}

