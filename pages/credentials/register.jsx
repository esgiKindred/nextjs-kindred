import {Button, Container, Form, Notification} from "react-bulma-components";
import styles from "./login.module.css";
import {LayoutCredentials} from "../../components/layout-credentials/layout-credentials";
import {signIn} from "next-auth/react";
import {useState} from "react";

export default function Register(){


    const [errorMessage, setErrorMessage] = useState(false);
    const [infoMessage, setInfoMessage] = useState(false);


    function handleSubmit(event) {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.currentTarget));

        //Guards

        if(data.firstname == ""){
            setErrorMessage("Le prénom ne doit pas être vide")
            return
        }
        if(data.lastname == ""){
            setErrorMessage("le nom ne doit pas être vide")
            return
        }
        if(data.username == ""){
            setErrorMessage("L'email ne doit pas être vide")
            return
        }

        if(data.password == "" || data.confirmpassword == ""){
            setErrorMessage("Le mot de passe ne doit pas être vide")
            return
        }
        if(data.password != data.confirmpassword){
            setErrorMessage("Les mots de passe ne correspondent pas")
            return
        }

        console.log(data)

        registration(data.firstname,data.lastname,data.username, data.password).then((response) =>{
             response.json().then(value =>{
                 setInfoMessage(value.message)
             })


        },(error) =>{
            console.log(error)
            setErrorMessage(error)
        })
    }

        return(
            <Container className={styles.main}>
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
                <p className="login-title">Creer votre compte</p>
                <form id="login-form" onSubmit={handleSubmit}>
                    <Form.Field>
                        <Form.Control>
                            <Form.Input
                                name="firstname"
                                color="primary"
                                type="text"
                                placeholder="Prénom"

                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                            <Form.Input
                                name="lastname"
                                color="primary"
                                type="text"
                                placeholder="Nom"
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                            <Form.Input
                                name="username"
                                color="primary"
                                type="text"
                                placeholder="Email"
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field>
                        <Form.Control>
                            <Form.Input
                                name="password"
                                color="primary"
                                type="password"
                                placeholder="Mot de passe"
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field>
                        <Form.Control>
                            <Form.Input
                                name="confirmpassword"
                                color="primary"
                                type="password"
                                placeholder="Confirmer le Mot de passe"

                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field kind="group">
                        <Form.Control>
                                <Button
                                    onClick={() => signIn()}
                                    className="create-account"
                                    type="button"
                                    color="link">
                                    Déjà inscrit ?, connectez vous
                                </Button>
                        </Form.Control>
                        <Form.Control>
                            <Button
                                color="secondary"
                                type="submit">
                                Valider
                            </Button>
                        </Form.Control>
                    </Form.Field>
                </form>
            </Container>
        )



        async function registration(firstname ,lastname,username,password) {
           return  fetch('http://127.0.0.1:8000/api/registration/parent',{ method: 'POST',
               headers: {
               "Content-Type": "application/json",
                },
               body: JSON.stringify({
                   firstname,
                   lastname,
                   username,
                   password
               })
           })
        }
}

Register.getLayout = function getLayout(page) {
    return (
        <LayoutCredentials>
            {page}
        </LayoutCredentials>
    )
}


