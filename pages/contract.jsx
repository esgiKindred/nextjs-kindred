import { LayoutHome } from "../components/layout-home/layout-home";
import { Button, Container } from "react-bulma-components";
import Link from "next/link";
import { Columns } from "react-bulma-components";
import enfant from "../assets/images/enfant1.png";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { GetContratsByUserId} from "../swr/service";
import { useSession } from "next-auth/react";
import CardUser from "../components/card-user/card-user";

export default function Contract() {

    const { data: session } = useSession();

    const { data : contratsData, error : contratsError } = GetContratsByUserId(session.user.id)



    if (contratsError) return <h1>Something went wrong!</h1>;
    if (!contratsData) return <h1>Loading...</h1>;

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

        {
         contratsData.map((contrat) => {
             console.log(contrat)
            return(
                <div  key={contrat.id} className={styles.card} >
                  <h3>{contrat.nom}</h3>
                    <div className={styles.listHorizontal}>
                        { contrat.users.map((user) => <CardUser key ={user.id} user={user}></CardUser>) }
                  </div>
                  <p>Etat</p>
                    {contrat.signatureParent && contrat.signatureEnfant ? <p>Signe</p> :  <p>En attente de signature</p>}
                  <div className={styles.listHorizontal}>
                      <Link href={{pathname : "/edit-contrat",query :{id : contrat.id}}} passHref>
                      <Button className={styles.submit} color="secondary" type="submit">
                      Modifier
                    </Button>
                      </Link>
                      <Button className={styles.submit} color="danger" type="submit">
                      Supprimer
                    </Button>
                  </div>
                </div>
            );
          })
        }
      </Columns>
    </Container>
  );
}

Contract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Contract.auth = true;
