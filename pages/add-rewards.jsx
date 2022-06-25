import { Form, Container, Button } from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import { useRouter } from "next/router";
import BackButton from "../components/buttons/back-button";

export default function AddRewards() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <Container className={styles.main}>
      <div className={styles.title}>
        <BackButton />
        <h2 className={styles.h2}>Créer une récompense</h2>
      </div>
      {error ? <Notification color={"danger"}>{error}</Notification> : null}
      <form id="add-rewards-form">
        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Input
              name="intitulé"
              color="primary"
              type="text"
              placeholder="Intitulé"
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className={styles.field}>
          <Form.Control>
            <Form.Textarea
              name="description"
              color="primary"
              type="text"
              placeholder="Description"
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

AddRewards.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
AddRewards.auth = false;
