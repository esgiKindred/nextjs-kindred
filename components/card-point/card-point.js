import styles from "./card-point.module.css";
import {Block} from "react-bulma-components";

export default function CardPoint({title,points,type}) {
    return (
        <Block className={type == 'bonus' ? styles.bonus : styles.kins}>
            <span>{title}</span>
            <span>{points}</span>
        </Block>
    );
}
