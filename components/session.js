import React from 'react'
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";


export default function Session() {
    const { data: session, status } = useSession()
    console.log(session)
    if (status === "authenticated") {
        return <div>
            <p>Signed in as {session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    }
    return <button onClick={() => signIn()}>Sign in</button>

}