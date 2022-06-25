import styles from "../../styles/Home.module.css";
import style from "./card-missions-parent.module.css";
import { Columns } from "react-bulma-components";
import enfant from "../../assets/images/enfant1.png";
import Image from "next/image";

export default function CardMissionsParent(column, user) {
  return (
    <Columns.Column className={styles.card}>
      <h3>{column.column.titre}</h3>

      <ul className={styles.listHorizontal}>
        <p className={styles.category}>{column.column.categorie}</p>
        <p className={styles.state}>{column.column.etat}</p>
      </ul>

      <div className={style.missionsCard}>
        <ul className={style.vertical}>
          <li className={styles.kins}>{column.column.kins} Kin's</li>
          <li className={styles.points}>{column.column.points} points</li>
        </ul>
      </div>
      <div className={styles.listHorizontal}>
        <p>Assigné à :</p>
        <Image src={enfant} alt="logo" />
        <p> {column.user.name}</p>
      </div>
      <p>Date limite : {column.column.date}</p>
    </Columns.Column>
  );
}
