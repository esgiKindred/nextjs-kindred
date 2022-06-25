import { Columns, Button, Container } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import style from "./mission.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import Circle from "../components/circles/circle";
import etoiles from "../assets/images/etoiles.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export default function Mission() {
  const [userInformation, setUserInformation] = useState({
    kins: "-",
    pointsBonus: "-",
    lastName: "-",
    firstName: "-",
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/" + "users/" + session.user.id,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const newData = await response.json();
      setUserInformation(newData);
    };

    fetchData();
  }, [session.user.id]);

  console.log(session);
  return (
    <Container className={styles.main}>
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

          <ul className={styles.listHorizontal}>
            <p>Je suis une catégorie</p>
            <p>Je suis un statut</p>
          </ul>

          <div className={style.missionsCard}>
            <ul className={style.vertical}>
              <li className={styles.kins}>12 Kin's</li>
              <li className={styles.points}>50 points</li>
            </ul>
            <Circle />
          </div>
          <div className={styles.listHorizontal}>
            <Image src={etoiles} alt="logo" />
            <p> Jeff Hépipioli</p>
          </div>
          <p>Du 12/04/2022 à 18hOO au 14/04/2022 à 9h00</p>
        </Columns.Column>
        <Columns.Column className={styles.card}>
          <h3>Titre de la mission</h3>

          <ul className={styles.listHorizontal}>
            <p>Je suis une catégorie</p>
            <p>Je suis un statut</p>
          </ul>

          <div className={style.missionsCard}>
            <ul className={style.vertical}>
              <li className={styles.kins}>12 Kin's</li>
              <li className={styles.points}>50 points</li>
            </ul>
            <Circle />
          </div>
          <div className={styles.listHorizontal}>
            <Image src={etoiles} alt="logo" />
            <p> Jeff Hépipioli</p>
          </div>
          <p>Du 12/04/2022 à 18hOO au 14/04/2022 à 9h00</p>
        </Columns.Column>
      </Columns>
    </Container>
  );
}

Mission.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Mission.auth = false;
