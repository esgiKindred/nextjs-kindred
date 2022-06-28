import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Form } from "react-bulma-components";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Session() {
  const { data: session, status } = useSession();
  const [profil, setProfil] = useState();
  useEffect(() => {
    if (session.user.roles.includes("parent")) {
      setProfil(<a href="/user-parent">{session.user.email}</a>);
    }

    if (
      session.user.roles.includes("enfant") ||
      session.user.roles.includes("ROLE_CHILD")
    ) {
      setProfil(<a href="/user">{session.user.email}</a>);
    }
  }, []);
  return (
    <div className="row">
      <div className="d-flex justify-content-center">{profil}</div>
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
