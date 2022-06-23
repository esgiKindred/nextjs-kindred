import { Columns, Button, Container } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import style from "./mission.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import Circle from "../components/circles/circle";
import Image from "../assets/images/etoiles.png";

export default function Mission() {
  return (
    <Container className={styles.main}>
      <div>
        <Columns>
          <Columns.Column size={8} className={styles.title}>
            <h2 className={styles.h2}>Mes missions</h2>
          </Columns.Column>
          <Columns.Column size={4} className={styles.boutons}>
            <Link href={"/add-mission"} passHref>
              <Button className={styles.bouton} type="button" color="secondary">
                Créer une mission
              </Button>
            </Link>
            <Link href={"/category"} passHref>
              <Button className={styles.bouton} type="button" color="secondary">
                Gérer les catégories
              </Button>
            </Link>
          </Columns.Column>
        </Columns>

        <Columns>
          <Columns.Column className={styles.card}>
            <h3>Titre de la mission</h3>
            <p>Je suis une catégorie</p>
            <div className={style.missionsCard}>
              <ul>
                <li>12 Kin's</li>
                <li>50 points</li>
              </ul>
              <Circle />
            </div>
          </Columns.Column>
          <Columns.Column className={styles.card}>
            <h3>Coucou c'est moi</h3>
            <p>Salut ca va</p>
          </Columns.Column>
        </Columns>

        <img src={Image} alt="Image"></img>
      </div>
    </Container>
  );
}

Mission.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Mission.auth = false;
