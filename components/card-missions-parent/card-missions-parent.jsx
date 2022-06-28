import styles from "../../styles/Home.module.css";
import style from "./card-missions-parent.module.css";
import { Columns } from "react-bulma-components";
import enfant from "../../assets/images/enfant1.png";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {GetFromUri, GetMissionByUserId} from "../../swr/service";

export default function CardMissionsParent({mission}) {


    const { data : categorieData, error : categorieError } = GetFromUri(mission.categorie)
    const { data : userData, error : userError } = GetFromUri(mission.user)


  return (
    <div className={styles.card}>
      <h3>{mission.titre}</h3>
      <div className={style.CategorieEtat}>
          { (categorieError || !categorieData) ?  <p className={styles.category}>-</p> : <p className={styles.category} style={{backgroundColor : categorieData.couleur}} >{categorieData.nom}</p>}
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
          { (userError || !userData) ?  <p>-</p> : <p> {userData.firstName}  {userData.lastName}</p>
          }
      </div>
      <p>Date limite : {mission.date}</p>
    </div>
  );





}
