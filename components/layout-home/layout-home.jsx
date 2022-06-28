import {Component} from "react";
import Drawer from "../drawer/drawer";
import Session from "../session/session";



export class LayoutHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"d-flex flex-column vh-100"}>
                <div className="d-flex align-items-center  App-Header">
                    <Drawer></Drawer>
                    <h1 className="App-Logo">Kindred</h1>
                    <Session></Session>
                </div>
                <div className={"content App-content"}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

