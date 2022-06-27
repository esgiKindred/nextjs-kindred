import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";
import {
  Button,
  Block,
  Image,
  Container,
  Notification,
} from "react-bulma-components";
import Link from "next/link";
import Dashboard from "./index";
import styles from "./user-parent.module.css";

export default function Contract() {
  return (
    <Container className={styles.main}>
      <Image src="" alt="Profile picture" />
      <Block>
        <h2>Prenom Nom</h2>
        <span>email</span>
      </Block>
      <Block className={styles.children}>
        <h3>Parent de :</h3>
        <Block className={styles.children_block}>
          <Image src="" alt="Children profile picture" />
          <span>Prenom Nom</span>
        </Block>
      </Block>
      <Block className={styles.buttons}>
        <Link href={"/add-child"} passHref>
          <Button
            className={styles.add_children}
            type="button"
            color="secondary"
          >
            Ajouter un compte enfant
          </Button>
        </Link>
        <Link href={"/modify-parent"} passHref>
          <Button
            className={styles.modify_parent}
            type="button"
            color="primary"
          >
            Modifier le profil
          </Button>
        </Link>
      </Block>
    </Container>
  );
}

Contract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Contract.auth = true;
