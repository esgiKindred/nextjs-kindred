import {LayoutCredentials} from "../../components/layout-credentials/layout-credentials";
import {Button, Form, Heading, Container, Notification} from "react-bulma-components";
import styles from "./login.module.css";
import {getCsrfToken} from "next-auth/react";
import {useRouter} from "next/router";
import Link from "next/link";


export default function Login({csrfToken})  {
    const router = useRouter()
    const { error} = router.query

      return (
          <Container className={styles.main}>
              { error ?
                  <Notification color={"danger"}>
                      {error}
                  </Notification>
                  : null
              }
            <p className="login-title">Connexion</p>
            <form id="login-form" method="post" action="/api/auth/callback/credentials">
                <Form.Input
                    name="csrfToken" type="hidden" defaultValue={csrfToken}
                />
              <Form.Field>
                <Form.Control>
                  <Form.Input
                      name="username"
                      color="primary"
                      type="text"
                      placeholder="Email"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Input
                      name="password"
                      color="primary"
                      type="password"
                      placeholder="Mot de passe"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field kind="group">
                <Form.Control>

                    <Link
                        href={'/credentials/register'}
                        passHref>
                        <Button
                            className="create-account"
                            type="button"
                            color="link">
                            Créer un compte ici
                        </Button>
                    </Link>
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

