import {Form, Container, Button, Notification} from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import { useRouter } from "next/router";
import BackButton from "../components/buttons/back-button";
import {GetCategories, GetUsers} from "../swr/service";
import {useState} from "react";
import {useSession} from "next-auth/react";

export default function AddContract() {
  const router = useRouter();
  const { error } = router.query;
  const { data: session } = useSession();


  const { data : usersData, error : usersError } = GetUsers()
  const [errorMessage, setErrorMessage] = useState(false);
  const [infoMessage, setInfoMessage] = useState(false);

  if (usersError) return <h1>Something went wrong!</h1>;
  if (!usersData) return <h1>Loading...</h1>;

  function handleSubmit(event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    //Guards

    if (data.nom == "") {
      setErrorMessage("nom du contrat vide");
      return;
    }


    if (data.enfant == "") {
      setErrorMessage("selectionner un enfant avec lequel ajouter un contrat");
      return;
    }

  console.log(session.user.id + "-" + data.enfant)
    fetch("http://127.0.0.1:8000/api/contrats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom : data.nom,
        users: ["api/users/" + session.user.id,"api/users/" + data.enfant],
        signatureParent : false,
        signatureEnfant : false
      }),
    }).then(
        (response) => {
          response.json().then((value) => {
            setInfoMessage(value.message);
          });
        },
        (error) => {
          console.log(error);
          setErrorMessage(error);
        }
    );
  }

  if (usersError) return <h1>Something went wrong!</h1>;
  if (!usersData) return <h1>Loading...</h1>;



  return (
    <Container className={styles.main}>
      <div className={styles.title}>
        {errorMessage ? (
            <Notification color={"danger"}>{errorMessage}</Notification>
        ) : null}
        {infoMessage ? (
            <Notification color={"info"}>{infoMessage}</Notification>
        ) : null}
        <BackButton />
        <h2 className={styles.h2}>Créer un contrat</h2>
      </div>
      {error ? <Notification color={"danger"}>{error}</Notification> : null}
      <form id="add-rewards-form" onSubmit={handleSubmit}>
        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
              name="nom"
              color="primary"
              type="text"
              placeholder="nom du contrat"
            />
          </Form.Control>
        </Form.Field>



        <Form.Field className={styles.field}>
          <Form.Label>Contrat avec</Form.Label>
          <Form.Control>
            <Form.Select name="enfant" color="primary" type="text">
              {usersData.map((user) => {
                return (
                    <option key={user.id} value={user.id}>
                      {user.firstName}  {user.lastName}
                    </option>
                );
              })}
            </Form.Select>
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

AddContract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
AddContract.auth = true;
