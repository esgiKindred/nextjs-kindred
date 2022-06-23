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
import styles from "./contract.module.css";

export default function Contract() {
  return (
    <Container className={styles.main}>
      <Link href={"/add-contract"} passHref>
        <Button
          className={styles.create_contract}
          type="button"
          color="secondary"
        >
          Créer un contrat
        </Button>
      </Link>
      <h2>Mes contrats</h2>
    </Container>
  );
}

Contract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Contract.auth = false;
