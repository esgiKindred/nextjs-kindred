
import {Component} from "react";
import {MenuLink} from "../menu-link/menu-link";
import styles from './drawer.module.css'
import Link from "next/link";
import Session from "../session";


export class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        if(this.state.open){
            return(
                <div className={styles.drawer}>
                    <span onClick={() => this.setState({ open: false })} className="icon">
                        <i className="bi bi-x-circle"></i>
                    </span>

                    <MenuLink routeDestination='/' routeName="Dashboard"></MenuLink>
                    <MenuLink routeDestination='/user' routeName="Profil"></MenuLink>
                    <MenuLink routeDestination='/user-parent' routeName="Profil Parent"></MenuLink>
                    <MenuLink routeDestination='/campaign' routeName="Contrat"></MenuLink>
                    <MenuLink routeDestination='/mission' routeName="Mission"></MenuLink>
                    <MenuLink routeDestination='/rewards' routeName="Recompenses"></MenuLink>
                    <MenuLink routeDestination='/rewards-parent' routeName="Recompense Parent"></MenuLink>

                    <h1>Dev</h1>

                    <MenuLink routeDestination='/credentials/login' routeName="Login"></MenuLink>
                    <MenuLink routeDestination='/credentials/register' routeName="Register"></MenuLink>

                    <Session></Session>

                </div>
            )
        } else {
            return(
                <span onClick={() => this.setState({ open: true })} className="icon">
                    <i className="bi bi-list"></i>
                </span>
            )
        }
    }

}

