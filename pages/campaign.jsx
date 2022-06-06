import {Component} from "react";
import {environment} from "../environment";
import {LayoutHome} from "../components/layout-home/layout-home";
import Dashboard from "./index";

export default class Campaign extends Component {
        render() {
            return <h1>Bonjour, {this.props.name}</h1>;
        }
        componentDidMount() {
            //fetch(environment.api + '')
        }
}

Campaign.getLayout = function getLayout(page) {
    return (
        <LayoutHome>
            {page}
        </LayoutHome>
    )
}