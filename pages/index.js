
import {LayoutHome} from "../components/layout-home/layout-home";
import {Component} from "react";
import {Button, Form} from "react-bulma-components";
export default function Dashboard() {
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

Dashboard.getLayout = function getLayout(page) {
    return (
        <LayoutHome>
            {page}
        </LayoutHome>
    )
}

Dashboard.auth = true

