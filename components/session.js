import React from 'react'
import {signIn, signOut, useSession} from "next-auth/react";


export default function Session() {
    const { session } = useSession()

    return <>
        {!session && <>
            Not signed in <br/>
            <button onClick={signIn}>Sign in</button>
        </>}
        {session && <>
            Signed in as {session.user.email} <br/>
            <button onClick={signOut}>Sign out</button>
        </>}
    </>
}