import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";
import { Columns, Button, Container } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function RewardsParent() {
  return (
    <Container className={styles.main}>
      <Columns>
        <Columns.Column size={8} className={styles.title}>
          <h2 className={styles.h2}>Récompenses disponibles</h2>
        </Columns.Column>
        <Columns.Column size={4} className={styles.boutons}>
          <Link href={"/add-rewards"} passHref>
            <Button className={styles.bouton} type="button" color="secondary">
              Ajouter une nouvelle récompense
            </Button>
          </Link>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column className={styles.card}>
          <h3>Coucou c'est moi</h3>
          <p>Je suis une description</p>
          <p className={styles.points}>50 points</p>
          <div className={styles.listHorizontal}>
            <Button className={styles.submit} color="secondary" type="submit">
              Modifier
            </Button>
            <Button className={styles.submit} color="danger" type="submit">
              Supprimer
            </Button>
          </div>
        </Columns.Column>
        <Columns.Column className={styles.card}>
          <h3>Coucou c'est moi</h3>
          <p>Je suis une description</p>
          <p className={styles.points}>50 points</p>
          <div className={styles.listHorizontal}>
            <Button className={styles.submit} color="secondary" type="submit">
              Modifier
            </Button>
            <Button className={styles.submit} color="danger" type="submit">
              Supprimer
            </Button>
          </div>
        </Columns.Column>{" "}
        <Columns.Column className={styles.card}>
          <h3>Coucou c'est moi</h3>
          <p>Je suis une description</p>
          <p className={styles.points}>50 points</p>
          <div className={styles.listHorizontal}>
            <Button className={styles.submit} color="secondary" type="submit">
              Modifier
            </Button>
            <Button className={styles.submit} color="danger" type="submit">
              Supprimer
            </Button>
          </div>
        </Columns.Column>
      </Columns>
    </Container>
  );
}

RewardsParent.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
RewardsParent.auth = true;
