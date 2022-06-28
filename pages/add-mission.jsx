import {
  Form,
  Container,
  Button,
  Notification,
  Columns,
} from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import { useRouter } from "next/router";
import BackButton from "../components/buttons/back-button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AddMission() {
  const router = useRouter();
  const { error } = router.query;

  const [errorMessage, setErrorMessage] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);

  const [categories, setCategories] = useState([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/" + "categories",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const newData = await response.json();
      // console.log(newData);
      setCategories(newData);
    };

    fetchData();
  }, [session.user.id]);

  function handleSubmit(event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    //Guards

    if (data.titre == "") {
      setErrorMessage("Le titre de la mission est vide");
      return;
    }

    if (data.date == "") {
      setErrorMessage("la date est vide");
      return;
    }

    fetch("http://127.0.0.1:8000/api/missions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titre: data.titre,
        kins : parseInt(data.kins),
        etat : "En cours",
        categorie : "api/categories/" + data.categorie,
        autoEvaluation : "",
        user : ["api/users/" + data.child],
        creator : "api/users/" + session.user.id,
        date : data.date,
        points : parseInt(data.points)
      })
    }).then((response) =>{
      response.json().then(value =>{
        setInfoMessage(value.message)
      })
    },(error) =>{
      setErrorMessage(error)
    })
  }

  return (
    <Container className={styles.main}>
      {errorMessage ? (
        <Notification color={"danger"}>{errorMessage}</Notification>
      ) : null}
      {infoMessage ? (
        <Notification color={"info"}>{infoMessage}</Notification>
      ) : null}
      <div className={styles.title}>
        <BackButton />
        <h2 className={styles.h2}>Créer une mission</h2>
      </div>
      {error ? <Notification color={"danger"}>{error}</Notification> : null}

      <form id="add-mission-form" onSubmit={handleSubmit}>
        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
              name="titre"
              color="primary"
              type="text"
              placeholder="Titre de la mission"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
              name="kins"
              color="primary"
              type="number"
              placeholder="Valeur en Kins"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Label>Categorie</Form.Label>
          <Form.Control>
            <Form.Select name="categorie" color="primary" type="text">
              {categories.map((categorie) => {
                return (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.nom}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Label>Enfant</Form.Label>
          <Form.Control>
            <Form.Select   name="child"
                           color="primary"
                           type="text"
                           >

              {children.map((child) => {
                return (
                    <option key={child.id} value={child.id}>{child.firstName} {child.lastName}</option>
                );
              })}
            </Form.Select>
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
              name="points"
              color="primary"
              type="number"
              placeholder="point bonus"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
              name="date"
              color="primary"
              type="date"
              placeholder="date de la mission"
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

AddMission.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
AddMission.auth = false;
