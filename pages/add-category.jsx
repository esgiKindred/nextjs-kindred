import {Form, Container, Button, Notification} from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import { useRouter } from "next/router";
import BackButton from "../components/buttons/back-button";
import {useState} from "react";
import {router} from "next/client";

export default function AddCategory() {
  const {query} = useRouter();


  const [errorMessage, setErrorMessage] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    //Guards

    if(data.nom == ""){
      setErrorMessage("Le nom de la categorie est vide")
      return
    }

    if(data.couleur == ""){
      setErrorMessage("la couleur est vide")
      return
    }

    fetch('http://127.0.0.1:8000/api/categories',{ method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: data.nom,
        couleur : data.couleur,
      })
    }).then((response) =>{
      console.log(response)
      if (response.status == 201){
        setInfoMessage("Catégorie crée avec success")
        setTimeout(() =>{
          router.back()
        },1000)
      }
    },(error) =>{
      console.log(error)
      setErrorMessage(error)
    })
  }


  return (
    <Container className={styles.main}>
      <div className={styles.title}>
        <BackButton />
        <h2 className={styles.h2}>Créer une catégorie</h2>
      </div>
      { errorMessage ?
          <Notification color={"danger"}>
            {errorMessage}
          </Notification>
          : null
      }
      { infoMessage ?
          <Notification color={"info"}>
            {infoMessage}
          </Notification>
          : null
      }
      <form id="add-mission-form" onSubmit={handleSubmit}>
        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
              name="nom"
              color="primary"
              type="text"
              placeholder="Nom de la mission"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
                name="couleur"
                color="primary"
                type="color"
                placeholder="Couleur de la catégorie"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Control>
            <Button className={styles.submit} color="secondary" type="submit">
              Ajouter
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
    </Container>
  );
}

AddCategory.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
AddCategory.auth = false;
