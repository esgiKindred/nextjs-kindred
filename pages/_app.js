import '../assets/styles/globals.css'
import {getCsrfToken, getSession, SessionProvider, signIn, signOut, useSession} from "next-auth/react"


export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
      <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
      )
}

