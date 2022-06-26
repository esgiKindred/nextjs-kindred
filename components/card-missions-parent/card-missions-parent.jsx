import styles from "../../styles/Home.module.css";
import style from "./card-missions-parent.module.css";
import { Columns } from "react-bulma-components";
import enfant from "../../assets/images/enfant1.png";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";

export default function CardMissionsParent({mission}) {

    const [categorie, setCategorie] = useState({nom : "chargement",couleur :'white'});
    const [user, setUser] = useState({firstname : "----",lastname : '----'});

    useEffect(() => {
        const fetchCategorie = async () => {
            const response = await getFromUri(mission.categorie)
            const newData = await response.json();
            setCategorie(newData);
        };
        fetchCategorie();

        const fetchUser = async () => {
            const response = await getFromUri(mission.user)
            const newData = await response.json();
            setUser(newData);
        };
        fetchUser();

    }, [setCategorie,setUser]);

  return (
    <div className={styles.card}>
      <h3>{mission.titre}</h3>

      <div className={style.CategorieEtat}>
        <p className={styles.category} style={{backgroundColor : categorie.couleur}} >{categorie.nom}</p>
        <p className={styles.state}>{mission.etat}</p>
      </div>

      <div className={style.missionsCard}>
        <ul className={style.vertical}>
          <li className={styles.kins}>{mission.kins} Kin's</li>
          <li className={styles.points}>{mission.points} points</li>
        </ul>
      </div>
      <div className={styles.listHorizontal}>
        <p>Assigné à :</p>
        <Image src={enfant} alt="logo" />
        <p> {user.firstName}  {user.lastName}</p>
      </div>
      <p>Date limite : {mission.date}</p>
    </div>
  );

  async function getFromUri(uri){
      return  fetch(
          "http://127.0.0.1:8000" + uri ,
          {
              headers: {
                  Accept: "application/json",
              },
          }
      );
  }



}
