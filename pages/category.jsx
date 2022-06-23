import { Columns, Button } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import BackButton from "../components/buttons/back-button";

export default function Category() {
  return (
    <div>
      <Columns>
        <Columns.Column size={8} className={styles.titleBack}>
          <BackButton />
          <h2>Liste des catégories</h2>
        </Columns.Column>
        <Columns.Column size={4} className={styles.boutons}>
          <Link href={"/add-category"} passHref>
            <Button className={styles.bouton} type="button" color="secondary">
              Créer une categorie de mission
            </Button>
          </Link>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column className={styles.card}>
          <h3>Coucou c'est moi</h3>
          <p>Salut ca va</p>
        </Columns.Column>
        <Columns.Column className={styles.card}>
          <h3>Coucou c'est moi</h3>
          <p>Salut ca va</p>
        </Columns.Column>
      </Columns>
    </div>
  );
}

Category.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Category.auth = false;
