import styles from "../../styles/Home.module.css";
import style from "./card-missions.module.css";
import { Columns, Button } from "react-bulma-components";
import enfant from "../../assets/images/enfant1.png";
import Image from "next/image";

import {apiUrl, GetFromUri} from "../../swr/service";
import {mutate} from "swr";

export default function CardMissions({ mission, role }) {
  const { data: categorieData, error: categorieError } = GetFromUri(
    mission.categorie
  );
  const { data: userData, error: userError } = GetFromUri(mission.user);


    function Delete(id) {
        fetch(apiUrl  + '/api/missions/' + id,{ method: 'DELETE'
        }).then(() =>{
            mutate(apiUrl + "/api/missions?creator=" + id)
        },(error) =>{
            console.log(error);
        })
    }

  return (
    <div className={styles.card}>
      <Columns>
        <Columns.Column size={8} className={styles.title}>
          <h3 className={styles.h3}>{mission.titre}</h3>
        </Columns.Column>
        {role == "parent" ? (
          <Columns.Column size={4} className={styles.boutons}>
            <Button className={styles.bouton} type="button" color="primary" onClick={() => Delete(mission.id)}>
              Supprimer
            </Button>
          </Columns.Column>
        ) : null}
      </Columns>
      <div className={style.CategorieEtat}>
        {categorieError || !categorieData ? (
          <p className={styles.category}>-</p>
        ) : (
          <p
            className={styles.category}
            style={{ backgroundColor: categorieData.couleur }}
          >
            {categorieData.nom}
          </p>
        )}
        <p className={styles.state}>{mission.etat}</p>
      </div>

      <div className={style.missionsCard}>
        <ul className={style.vertical}>
          <li className={styles.kins}>{`${mission.kins} Kin's`}</li>
          <li className={styles.points}>{`${mission.points} points`}</li>
        </ul>
      </div>
      <div className={styles.listHorizontal}>
        <p>Assigné à :</p>
        <Image src={enfant} alt="logo" />
        {userError || !userData ? (
          <p>-</p>
        ) : (
          <p>
            {" "}
            {userData.firstName} {userData.lastName}
          </p>
        )}
      </div>
      <p>Date limite : {mission.date}</p>
    </div>
  );
}
