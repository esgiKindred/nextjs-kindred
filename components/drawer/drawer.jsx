import {Component, useState} from "react";
import { MenuLink } from "../menu-link/menu-link";
import style from "./drawer.module.css";

export default function Drawer() {

const [open,setOpen] = useState(false)

    if (open) {
      return (
                <div className={style.drawer} onClick={() => setOpen(false)} >
                    <div className={style.content}>
                      <span  className="icon">
                        <i className="bi bi-x-circle"></i>
                        </span>
                <MenuLink routeDestination="/" routeName="Dashboard"></MenuLink>
                <MenuLink routeDestination="/contract" routeName="Contrat"></MenuLink>
                <MenuLink routeDestination="/mission" routeName="Mission"></MenuLink>
                <MenuLink
                    routeDestination="/rewards"
                    routeName="Recompenses"
                ></MenuLink>
                <MenuLink
                    routeDestination="/rewards-parent"
                    routeName="Recompense Parent"
                ></MenuLink>
                    </div>
            </div>
      );
    } else {
      return (
        <span  className="icon position-absolute" onClick={() => setOpen(true)}>
          <i className="bi bi-list"></i>
        </span>
      );
    }

}
