import {Columns, Button, Container, Notification} from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import Link from "next/link";
import BackButton from "../components/buttons/back-button";
import {useEffect, useState} from "react";


export default function Category() {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch(
          "http://127.0.0.1:8000/api/" + "categories",
          {
            headers: {
              Accept: "application/json",
            },
          }
      )

      const newData = await response.json();
      setCategories(newData);
    };
  fetchData();
  },[setCategories,refresh])



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
      { errorMessage ?
          <Notification color={"danger"}>
            {errorMessage}
          </Notification>
          : null
      }
      <Columns className={styles.cards}>

        {
          categories.map((categorie) => {
            console.log(categorie)
            return(
            <div  key={categorie.id} className={styles.card} style={{backgroundColor : categorie.couleur}} >
              <h3>{categorie.nom}</h3>
              <div className={styles.listHorizontal}>
                <Link href={{pathname : "/edit-category",query : {id : categorie.id,nom: categorie.nom, couleur : categorie.couleur}}} passHref>
                <Button className={styles.submit} color="secondary"  type="submit">
                  Modifier
                </Button>
                </Link>
                <Button className={styles.submit} color="danger" type="submit" onClick={() =>{deleteCategory(categorie.id)}}>
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


  function deleteCategory(id){
    fetch('http://127.0.0.1:8000/api/categories/' + id,{ method: 'DELETE'
    }).then(() =>{
      setRefresh(!refresh)
    },(error) =>{
      console.log(error);
      setErrorMessage(error);
    })
  }
}

Category.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Category.auth = false;
