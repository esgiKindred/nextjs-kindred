import {Component} from "react";
import {LayoutHome} from "../components/layout-home/layout-home";
import Dashboard from "./index";

export default function Campaign(){

            return (
                <h1>Eampagnes </h1>
            )

}

Campaign.getLayout = function getLayout(page) {
    return (
        <LayoutHome>
            {page}
        </LayoutHome>
    )
}
Campaign.auth = true
