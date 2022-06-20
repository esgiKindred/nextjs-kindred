
import {LayoutHome} from "../components/layout-home/layout-home";
import {Button, Form} from "react-bulma-components";
import {useSession} from "next-auth/react";
export default function Dashboard() {
    const { data: session, status } = useSession()
    console.log(session)
    return (

                <div>
                    <h1>Bienvenue {session.user.email} {session.user.roles[0]} {session.user.id}</h1>


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

