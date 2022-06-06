import {Component} from "react";
import styles from './layout-credentials.module.css'


export class LayoutCredentials extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className={"d-flex flex-column vh-100"}>
              <h1 className={styles.logo}>Kindred</h1>
              <div className={"d-flex w-100 flex-fill"}>
                  {this.props.children}
              </div>
          </div>
        )
    }
}

