import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {redirect} from "next/dist/server/api-utils";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Kindred',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch(process.env.SYMFONY_API + "login_check", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    mode: "cors",
                    cache: "default",
                    body: JSON.stringify(credentials),
                })
                console.log('authorize')
                const user = await res.json()
                //const user = {token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQ4MDg5MTUsImV4cCI6MTY1NDgxMjUxNSwicm9sZXMiOlsicGFyZW50IiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGNoaTJAaWNsb3VkLmNvbSJ9.myQOUKYmDQ9dATP502xsYLRGgStEt22BPNeoRqDlQtUmfwbo6VrSZgULskZeWdgvqGS7DjZR5Jg--PPz9jXLdmkqGVgaXq2Qf9PRb5f8Zz7Vs5HI0j2IIlEFrK26IxgBFa0oQYd9XI4_qimaXxTgDDqJL7gXaNoNByw3Gx5e8zYdVuJ1JxESVtCRlOGDZl7VinjXJ8VdXJ_vcqlkrq3a3EhLkK5J-gtkkgSox8DfBKZyx3s_4sa7GZ3v5rtO4ica6e1h0b7BNmci9BE37Y-miMfDClFafqZzUub94vzJDuDCMUrMbGWNUSxY1KLczAR8ADxtV5OfrlGpDG94p8zFiA"}
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null
            }


        })
    ],
    //Custom sign in page
     pages: {
          signIn: '/credentials/login',
     },
    //Callbacks configuration - we create a new JWT Next token with `access_token` (from Symfony).
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                const symfonyDecodedToken = parseJwt(user.token);

                user.email = symfonyDecodedToken.username
                user.roles = symfonyDecodedToken.roles


                token = {
                    access_token : user.token,// <-- add du token de l'API Symfony dans le token JWT (Next's) object
                    user : user
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async redirect({ url, baseUrl }) {
           if(url == baseUrl + "/credentials/register"){
               return baseUrl
           } else{
               return url
           }
        }
    },
    session :{
        strategy: "jwt",
        maxAge:  30 * 60,// 30 minutes
    },
    secret: process.env.NEXTAUTH_SECRET,
})

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}