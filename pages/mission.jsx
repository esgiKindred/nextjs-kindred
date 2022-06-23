import { Columns, Button } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import Circle from "../components/circles/circle";
import Image from "../assets/images/etoiles.png";

export default function Mission() {
  return (
    <div>
      <Columns>
        <Columns.Column size={8}>
          <h2>Mes missions</h2>
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
          <h3>Coucou c'est moi</h3>
          <p>Salut ca va</p>
          <Circle />
          <img src={Image} alt="Image"></img>
        </Columns.Column>
        <Columns.Column className={styles.card}>
          <h3>Coucou c'est moi</h3>
          <p>Salut ca va</p>
        </Columns.Column>
      </Columns>

      <p>Hey bitch</p>
    </div>
  );
}

Mission.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Mission.auth = false;
