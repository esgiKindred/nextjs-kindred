import React from 'react'
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";



export default function Session() {
    const { data: session, status } = useSession()
        return <div>
            <p>{session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
}