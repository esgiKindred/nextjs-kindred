import { Columns, Button, Container } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import BackButton from "../components/buttons/back-button";

export default function Category() {
  return (
    <Container className={styles.main}>
      <div>
        <Columns>
          <Columns.Column size={8} className={styles.title}>
            <BackButton />
            <h2 className={styles.h2}>Liste des catégories</h2>
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
              <Button className={styles.submit} color="secondary" type="submit">
                Modifier
              </Button>
              <Button className={styles.submit} color="danger" type="submit">
                Supprimer
              </Button>
            </div>
          </Columns.Column>
        </Columns>
      </div>
    </Container>
  );
}

Category.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Category.auth = false;
