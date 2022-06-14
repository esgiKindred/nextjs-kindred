import '../assets/styles/globals.css'
import {getCsrfToken, getSession, SessionProvider, signIn, signOut, useSession} from "next-auth/react"
import {withAuth} from "next-auth/middleware";


export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
      <SessionProvider session={session}>

          {Component.auth ? (
          <Auth>
              {getLayout(<Component {...pageProps} />)}
          </Auth>
          ) : getLayout(<Component {...pageProps} />)
          }

      </SessionProvider>
      )
}

function Auth({ children }) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return children
}