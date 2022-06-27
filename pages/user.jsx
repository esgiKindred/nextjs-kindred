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
import styles from "./user.module.css";

export default function Contract() {
  return (
    <Container className={styles.main}>
      <div className={styles.picture_block}>
        <Image src="" alt="Profile picture" className={styles.picture} />
      </div>
      <Block>
        <h2>Prenom Nom</h2>
        <span>email</span>
      </Block>
      <Block className={styles.parent}>
        <h3>Enfant de :</h3>
        <Block className={styles.parent_block}>
          <Image src="" alt="Parent profile picture" />
          <span>Prenom Nom</span>
        </Block>
      </Block>
      <Block className={styles.points}>
        <h3>Mes cagnottes</h3>
        <Block className={styles.points_block}>
          <Block className={styles.kins}>
            <span>{"Total des Kin's"}</span>
            <span>{"XX Kin's"}</span>
          </Block>
          <Block className={styles.bonus}>
            <span>{"Total des points bonus"}</span>
            <span>{"XX points"}</span>
          </Block>
        </Block>
      </Block>
    </Container>
  );
}

Contract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Contract.auth = true;
