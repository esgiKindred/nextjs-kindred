import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Form } from "react-bulma-components";

import enfant from "../../assets/images/enfant1.png";
import parent from "../../assets/images/parent1.png";
import Image from "next/image";

export default function Session() {
  const { data: session, status } = useSession();
  const isParent = session.user.roles.includes("parent");
  return (
    <div className="row">
      <div className="d-flex justify-content-center">
          <Image src={isParent ? parent : enfant} alt="logo" width={40} height={40} />
          <a href={ isParent? "/user-parent" :"/user"}>{session.user.email}</a>
      </div>
      <Button
        className=""
        type="button"
        color="primary"
        onClick={() => signOut()}
      >
        Déconnexion
      </Button>
    </div>
  );
}
