import { Component } from "react";
import { LayoutHome } from "../components/layout-home/layout-home";
import {
  Button,
  Block,
  Image,
  Container,
  Notification,
} from "react-bulma-components";
import Link from "next/link";
import Dashboard from "./index";
import styles from "./user.module.css";
import CardPoint from "../components/card-point/card-point";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Circle from "../components/circles/circle";

export default function Contract() {
  const [userInformation, setUserInformation] = useState([]);
  const [parentInformation, setParentInformation] = useState([])
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
        const response = await fetch(
        "http://127.0.0.1:8000/api/" + "users/" + session.user.id,
        {
            headers: {
            Accept: "application/json",
            },
        }
        );
        const newData = await response.json();
        setUserInformation(newData);
    };
    fetchUser();

    const fetchParent = async () => {
      const response = await fetch(
      "http://127.0.0.1:8000/api/" + "users/?enfants=" + session.user.id,
      {
          headers: {
          Accept: "application/json",
          },
      }
      );
      const newData = await response.json();
      console.log(newData)
      setParentInformation(newData);
    };
    fetchParent();
  }, [session.user.id]);
  return (
    <Container className={styles.main}>
      <div className={styles.picture_block}>
        <div class="d-flex justify-content-center"><Circle/></div>
      </div>
      <Block>
        <h2>{userInformation.lastName} {userInformation.firstName}</h2>
        <span>{userInformation.email}</span>
      </Block>
      <Block className={styles.children}>
        <h3>Enfant de :</h3>
        <Block>
          {parentInformation.map((parent) => {
            return (
              <div class="d-flex justify-content-center"><span><Circle/>{parent.lastName} {parent.firstName}</span></div>
            );
        })}
        </Block>
      </Block>
      <Block className={styles.points}>
        <h3>Mes cagnottes</h3>
        <Block className={styles.points_block}>
            <CardPoint
                title={"Total des Kin's"}
                points={userInformation.kins}
                type={'kins'}
            ></CardPoint>
            <CardPoint
                title={"Total des points"}
                points={userInformation.pointsBonus}
                type={'bonus'}
            ></CardPoint>

        </Block>
      </Block>
    </Container>
  );
}

Contract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Contract.auth = true;
