import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.email}
              {item.password}
            </li>
          ))}
        </ul>
      );
    }
  }

  componentDidMount() {
    fetch(environment.api + "users?page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      cache: "default",
    }).then((response) => {
      response.json().then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          error.message += response.body;

          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    });
  }
}

Users.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Users.auth = true;
