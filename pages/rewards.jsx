import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";
import { Columns, Button, Container } from "react-bulma-components";
import styles from "../styles/Home.module.css";

export default function Rewards() {
  return (
    <Container className={styles.main}>
      <h2 className={styles.h2}>Récompenses disponibles</h2>
    </Container>
  );
}

Rewards.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Rewards.auth = true;
