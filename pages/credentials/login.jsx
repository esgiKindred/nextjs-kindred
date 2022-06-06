import { Component } from "react";
import { environment } from "../../environment";
// import { ReactSession } from "react-client-session";
// import { useNavigate } from "react-router-dom";
import { Button, Form, Heading, Container } from "react-bulma-components";
import styles from "./login.module.css";
import {LayoutCredentials} from "../../components/layout-credentials/layout-credentials";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      valueEmail: "",
      valuePassword: "",
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ valueEmail: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ valuePassword: event.target.value });
  }

  handleSubmit(event) {
    this.checkLogin();
    event.preventDefault();
  }

  handleCreateAccount(event) {
    this.props.navigate("/register");
    event.preventDefault();
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
          <Container className={styles.main}>
            <p className="login-title">Connexion</p>
            <form id="login-form">
              <Form.Field>
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Form.Input
                    color="primary"
                    type="email"
                    value={this.state.valueEmail}
                    onChange={this.handleChangeEmail}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control>
                  <Form.Input
                    color="primary"
                    type="password"
                    value={this.state.valuePassword}
                    onChange={this.handleChangePassword}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field kind="group">
                <Form.Control>
                  <Button
                    className="create-account"
                    type="button"
                    onClick={this.handleCreateAccount}
                    color="link"
                  >
                    Créer un compte ici
                  </Button>
                </Form.Control>
                <Form.Control>
                  <Button
                    color="secondary"
                    type="button"
                    onClick={this.handleSubmit}
                  >
                    Connexion
                  </Button>
                </Form.Control>
              </Form.Field>
            </form>
          </Container>
      );
    }
  }

  componentDidMount() {
    this.setState({
      isLoaded: true,
    });
  }

  checkLogin() {
    fetch(environment.api + "login_check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        username: this.state.valueEmail,
        password: this.state.valuePassword,
      }),
    }).then((response) => {
      response.json().then(
        (result) => {
          console.log(result);
          if (result.token) {
            alert(result.token);

            const userInfo = parseJwt(result.token);
            console.log(userInfo);
            ReactSession.set("username", userInfo.username);
            ReactSession.set("token", result.token);
            ReactSession.set("roles", userInfo.roles);

            this.props.navigate("/dashboard");
          } else {
            alert(result.message);
          }
        },
        (error) => {
          error.message += response.body;
          this.setState({ error });
        }
      );
    });
  }
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

Login.getLayout = function getLayout(page) {
  return (
      <LayoutCredentials>
        {page}
      </LayoutCredentials>
  )
}


