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
import styles from "./user-parent.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Circle from "../components/circles/circle";

export default function Contract() {
    const [userInformation, setUserInformation] = useState([]);
    const [childrenInformation, setChildrenInformation] = useState([])
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

      const fetchChildren = async () => {
        const response = await fetch(
        "http://127.0.0.1:8000/api/" + "users/?parent=" + session.user.id,
        {
            headers: {
            Accept: "application/json",
            },
        }
        );
        const newData = await response.json();
        setChildrenInformation(newData);
      };
      fetchChildren();
    }, [session.user.id]);
  return (
    <Container className={styles.main}>
      <div class="d-flex justify-content-center"><Circle/></div>
      
      <Block>
        <h2>{userInformation.lastName} {userInformation.firstName}</h2>
        <span>{userInformation.email}</span>
      </Block>
      <Block className={styles.children}>
        <h3>Parent de :</h3>
        <Block className={styles.children_block}>
        {childrenInformation.map((child) => {
            return (
            <span><Circle/>{child.lastName} {child.firstName}</span>
            );
        })}
        </Block>
      </Block>
      <Block className={styles.buttons}>
        <Link href={"/add-child"} passHref>
          <Button
            className={styles.add_children}
            type="button"
            color="secondary"
          >
            Ajouter un compte enfant
          </Button>
        </Link>
        <Link href={"/modify-parent"} passHref>
          <Button
            className={styles.modify_parent}
            type="button"
            color="primary"
          >
            Modifier le profil
          </Button>
        </Link>
      </Block>
    </Container>
  );
}

Contract.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
Contract.auth = true;
