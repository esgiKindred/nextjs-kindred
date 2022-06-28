import {Columns, Button, Container, Notification} from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import BackButton from "../components/buttons/back-button";
import {DeleteCategory, GetCategories} from "../swr/service";
import {useState} from "react";
import {useSWRConfig} from "swr";


export default function Category() {

  const { data : categoriesData, error : categoriesError } = GetCategories()

  const { mutate } = useSWRConfig()


  if (categoriesError) return <h1>Something went wrong!</h1>
  if (!categoriesData) return <h1>Loading...</h1>

  function Delete(id) {
      fetch('http://127.0.0.1:8000/api/categories/' + id,{ method: 'DELETE'
      }).then(() =>{
        mutate('http://127.0.0.1:8000/api/categories')
      },(error) =>{
        console.log(error);
        categoriesError(error);
      })

  }

  return (
    <Container className={styles.main}>
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
      { categoriesError ?
          <Notification color={"danger"}>
            {categoriesError.body}
          </Notification>
          : null
      }
      <Columns className={styles.cards}>

        {
          categoriesData.map((categorie) => {
            return(
            <div  key={categorie.id} className={styles.card} style={{backgroundColor : categorie.couleur}} >
              <h3>{categorie.nom}</h3>
              <div className={styles.listHorizontal}>
                <Link href={{pathname : "/edit-category",query : {id : categorie.id,nom: categorie.nom, couleur : categorie.couleur}}} passHref>
                <Button className={styles.submit} color="secondary"  type="submit">
                  Modifier
                </Button>
                </Link>
                <Button className={styles.submit} color="danger" type="submit" onClick={() => Delete(categorie.id)}>
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

Category.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Category.auth = false;
