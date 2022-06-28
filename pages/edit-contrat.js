import {Form, Container, Button, Notification} from "react-bulma-components";
import styles from "../styles/Home.module.css";
import { LayoutHome } from "../components/layout-home/layout-home";
import { useRouter } from "next/router";
import BackButton from "../components/buttons/back-button";
import {GetCategories, GetContratById, GetUsers} from "../swr/service";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {router} from "next/client";

export default function EditContract() {
    const router = useRouter();
    const { error } = router.query;
    const { data: session } = useSession();


    const { data : contratData, error : contratError } = GetContratById(router.query.id)
    const [errorMessage, setErrorMessage] = useState(false);
    const [infoMessage, setInfoMessage] = useState(false);

    if (contratError) return <h1>Something went wrong!</h1>;
    if (!contratData) return <h1>Loading...</h1>;

    function handleSubmit(event) {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.currentTarget));
        console.log(data)
        fetch("http://127.0.0.1:8000/api/contrats/" + router.query.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
            body: JSON.stringify({
                nom : data.nom,
                signatureEnfant : data.signatureEnfant == "true",
                signatureParent : data.signatureParent == "true"
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

    if (contratError) return <h1>Something went wrong!</h1>;
    if (!contratData) return <h1>Loading...</h1>;



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
                            defaultValue={contratData.nom}

                        />
                    </Form.Control>
                </Form.Field>


                <Form.Field className={styles.field}>
                    <Form.Control>
                        <Form.Label>
                            Signé par le parent
                        </Form.Label>
                        <Form.Checkbox
                            name="signatureParent"
                            color="primary"
                            type="checkbox"
                            value={true}
                            defaultChecked={contratData.signatureParent}
                        />
                    </Form.Control>
                </Form.Field>

                <Form.Field className={styles.field}>
                    <Form.Control>
                        <Form.Label>
                            Signé par l'enfant
                        </Form.Label>
                        <Form.Checkbox
                            name="signatureEnfant"
                            color="primary"
                            type="checkbox"
                            value={true}
                            defaultChecked={contratData.signatureEnfant}
                        />
                    </Form.Control>
                </Form.Field>


                <Form.Field className={styles.field}>
                    <Form.Control>
                        <Button className={styles.submit} color="secondary" type="submit">
                            Signer
                        </Button>
                    </Form.Control>
                </Form.Field>
            </form>
        </Container>
    );
}

EditContract.getLayout = function getLayout(page) {
    return <LayoutHome>{page}</LayoutHome>;
};
EditContract.auth = true;
