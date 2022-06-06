import {Component} from "react";

import styles from './menu-link.module.css';
import Link from "next/link";


export class MenuLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link href={this.props.routeDestination}>
                <a className={styles.menuLink}>{this.props.routeName}</a>
            </Link>

        )
    }
}

