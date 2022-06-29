import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";
import { Columns, Button, Container } from "react-bulma-components";
import styles from "../styles/Home.module.css";

export default function Rewards() {
  return (
    <Container className={styles.main}>
      <h2 className={styles.h2}>Acheter une récompense</h2>

      <Columns className={styles.cards}>
        <Columns.Column className={styles.card}>
          <h3>Coucou c&apos;est moi</h3>
          <p>Je suis une description</p>

          <div className={styles.listHorizontal}>
            <span className={styles.points}>50 points</span>
            <Button className={styles.submit} color="secondary" type="submit">
              Acheter
            </Button>
          </div>
        </Columns.Column>
        <Columns.Column className={styles.card}>
          <h3>Coucou c&apos;est moi</h3>
          <p>Je suis une description</p>

          <div className={styles.listHorizontal}>
            <span className={styles.points}>50 points</span>
            <Button className={styles.submit} color="secondary" type="submit">
              Acheter
            </Button>
          </div>
        </Columns.Column>
        <Columns.Column className={styles.card}>
          <h3>Coucou c&apos;est moi</h3>
          <p>Je suis une description</p>

          <div className={styles.listHorizontal}>
            <span className={styles.points}>50 points</span>
            <Button className={styles.submit} color="secondary" type="submit">
              Acheter
            </Button>
          </div>
        </Columns.Column>
      </Columns>
    </Container>
  );
}

Rewards.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Rewards.auth = true;
