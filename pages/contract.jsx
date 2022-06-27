import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";
import { Button, Container } from "react-bulma-components";
import Link from "next/link";
import { Columns } from "react-bulma-components";
import enfant from "../assets/images/enfant1.png";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Contract() {
  return (
    <Container className={styles.main}>
      <Columns>
        <Columns.Column size={8} className={styles.title}>
          <h2 className={styles.h2}>Mes contrats</h2>
        </Columns.Column>
        <Columns.Column size={4} className={styles.boutons}>
          <Link href={"/add-contract"} passHref>
            <Button className={styles.bouton} type="button" color="secondary">
              Ajouter un nouveau contrat
            </Button>
          </Link>
        </Columns.Column>
      </Columns>

      <Columns className={styles.cards}>
        <Columns.Column className={styles.card}>
          <h3>Coucou c'est moi</h3>
          <div className={styles.listHorizontal}>
            <p>Avec :</p>
            <Image src={enfant} alt="logo" />
            <p> Kelly Diote</p>
          </div>
          <p>Etat</p>
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
          <div className={styles.listHorizontal}>
            <p>Avec :</p>
            <Image src={enfant} alt="logo" />
            <p> Kelly Diote</p>
          </div>
          <p>Etat</p>
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
          <div className={styles.listHorizontal}>
            <p>Avec :</p>
            <Image src={enfant} alt="logo" />
            <p> Kelly Diote</p>
          </div>
          <p>Etat</p>
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

Contract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Contract.auth = true;
