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

export default function AddContract() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <Container className={styles.main}>
      <div className={styles.title}>
        <BackButton />
        <h2 className={styles.h2}>Ajouter un compte enfant</h2>
      </div>
      {error ? <Notification color={"danger"}>{error}</Notification> : null}
      <form id="add-contract-form" className={styles.form}>
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
                name="firstame"
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

AddContract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
AddContract.auth = false;
