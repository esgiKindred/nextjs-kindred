import {Component} from "react";
import {environment} from "../../environment";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
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
                    {items.map(item => (
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

        // ReactSession.set("username", "Bob");
        // ReactSession.set("token", "test");


        var myHeaders = new Heades();
        myHeaders.append('Content-Type','application/json')
        myHeaders.append('Accept','application/json')
        var myInit = { method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };
        fetch(environment.api + 'users?page=1',myInit).then((response) =>{
            response.json().then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    error.message += response.body

                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
        })
    }
}

