import { Columns, Button, Container } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import CardMissionsParent from "../components/card-missions-parent/card-missions-parent";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Mission() {


  const [missions, setMissions] = useState([]);

  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/" + "missions?user=" + session.user.id,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const newData = await response.json();
      setMissions(newData);

    };

    fetchData();
  }, [session.user.id]);



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
      <Columns centered={true}>

            {missions.map((mission) => {
              return (
              <CardMissionsParent key={mission.id} mission={mission}/>
              )
            })}
      </Columns>

    </Container>
  );
}

Mission.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Mission.auth = true;
