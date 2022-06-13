import {LayoutCredentials} from "../../components/layout-credentials/layout-credentials";
import { Button, Form, Heading, Container } from "react-bulma-components";
import styles from "./login.module.css";
import {getCsrfToken} from "next-auth/react";

export default function Login(csrfToken )  {

      return (
          <Container className={styles.main}>
            <p className="login-title">Connexion</p>
            <form id="login-form" method="post" action="/api/auth/callback/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Form.Field>
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Form.Input
                      name="username"
                      color="primary"
                      type="text"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control>
                  <Form.Input
                      name="password"
                      color="primary"
                      type="password"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field kind="group">
                <Form.Control>
                  <Button
                    className="create-account"
                    type="button"
                    color="link">
                    Créer un compte ici
                  </Button>
                </Form.Control>
                <Form.Control>
                  <Button
                    color="secondary"
                    type="submit"
                  >
                    Connexion
                  </Button>
                </Form.Control>
              </Form.Field>
            </form>
          </Container>
      );
}


Login.getLayout = function getLayout(page) {
  return (
      <LayoutCredentials>
        {page}
      </LayoutCredentials>
  )
}


export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

