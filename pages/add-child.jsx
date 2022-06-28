import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";
import {
  Button,
  Form,
  Heading,
  Container,
  Notification,
} from "react-bulma-components";
import Link from "next/link";
import Dashboard from "./index";
import styles from "./add-child.module.css";
import BackButton from "../components/buttons/back-button";
import { useRouter } from "next/router";
import {useState} from "react";
import { useSession } from "next-auth/react";

export default function AddChild() {
  const router = useRouter();
  const { error } = router.query;
  const [errorMessage, setErrorMessage] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);
  const { data: session, status } = useSession();

  function handleSubmit(event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    //Guards

    if(data.lastname == ""){
      setErrorMessage("Le nom  est vide")
      return
    }

    if(data.firstname == ""){
      setErrorMessage("le prénom est vide")
      return
    }

    if(data.username == ""){
      setErrorMessage("l'email est vide")
      return
    }

    if(data.password == ""){
      setErrorMessage("le password est vide")
      return
    }

    fetch('http://127.0.0.1:8000/api/registration/child',{ 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastname: data.lastname,
        firstname: data.firstname,
        username: data.username,
        password: data.password,
        parent : session.user.id,
      })
    }).then((response) =>{
      response.json().then(value =>{
        setInfoMessage(value.message)
      })
    },(error) =>{
      console.log(error)
      setErrorMessage(error)
    })
  }

  return (
    <Container className={styles.main}>
      { errorMessage ?
          <Notification color={"danger"}>
            {errorMessage}
          </Notification>
          : null
      }
      { infoMessage ?
          <Notification color={"info"}>
            {infoMessage}
          </Notification>
          : null
      }
      <div className={styles.title}>
        <BackButton />
        <h2 className={styles.h2}>Ajouter un compte enfant</h2>
      </div>
      {error ? <Notification color={"danger"}>{error}</Notification> : null}
      <form id="add-contract-form" className={styles.form} onSubmit={handleSubmit}>
        <div>
          <Form.Field className={styles.field}>
            <Form.Control>
              <Form.Input
                name="lastname"
                color="primary"
                type="text"
                placeholder="Nom"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className={styles.field}>
            <Form.Control>
              <Form.Input
                name="firstname"
                color="primary"
                type="text"
                placeholder="Prénom"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className={styles.field}>
            <Form.Control>
              <Form.Input
                name="username"
                color="primary"
                type="text"
                placeholder="Email"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className={styles.field}>
            <Form.Control>
              <Form.Input
                name="password"
                color="primary"
                type="text"
                placeholder="Mot de passe"
              />
            </Form.Control>
          </Form.Field>
        </div>

        <Form.Field className={styles.field}>
          <Form.Control>
            <Button className={styles.submit} color="secondary" type="submit">
              {"Envoyer l'invitation"}
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
    </Container>
  );
}

AddChild.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
AddChild.auth = true;
