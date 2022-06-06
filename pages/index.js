import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {LayoutHome} from "../components/layout-home/layout-home";
import {Component} from "react";
import {Button, Form} from "react-bulma-components";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <div>
                    <h1>Dashboard</h1>
                    {/*<p>{ReactSession.get("roles")}</p>*/}
                    {/*<p>{ReactSession.get("token")}</p>*/}

                    <Button color={"primary"}>Test</Button>
                    <Button color={"secondary"}>Test</Button>
                    <Button color={"danger"}>Test</Button>
                    <hr />
                    <Form.Label>Input example</Form.Label>
                    {/* <TextArea placeholder={"textarea"} />
          <Select placeholder={"textarea"} /> */}
                </div>
            );
        }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
        });
    }
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <LayoutHome>
            {page}
        </LayoutHome>
    )
}