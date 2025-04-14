
import axios from "axios";
import { ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

//custom user
export type CustomUser = {
    userId?: string | null,
    name?: string | null,
    email?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    token?: string | null

}


//custom session
export type CustomSession = {
    user?: CustomUser,
    expires?: ISODateString
}

//auth options:- 

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type:"credentials",
            credentials: {
                email: { label: "Email", type:"email", placeholder:"Enter your email"},
                password: { label:"Password", type:"password"}
            },
            async authorize( credentials, req ){

                // console.log("credentials:-----------------",credentials);
                if (!credentials || !credentials.email || !credentials.password) {
                    // throw new Error("Email and password are required");.
                    return null;
                }

                try{
                const { data} = await axios.post(
                    `${process.env.BACKEND_API_URL}/user/login`,
                    credentials,
                    { headers:{ "Content-Type":"application/json"}}
                )

                const user = data.data as CustomUser;
                if(user){
                    return user;
                }
                else{
                    return null;
                }
            }
            catch(err){
                console.log(err);
                return null;
            }
                
            }
        })

    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user}:{ token:JWT, user:CustomUser}){
              
            // Persist the OAuth access_token to the token after signin
            //   console.log("2222222222 ",token, " 4444444444444 ",user);

            if(user){
                token.user = user;
            }

            return token;
        },
        async session({ user, token, session}:{ user:CustomUser, token: JWT, session: CustomSession}){
            session.user = token.user as CustomUser;
            return token;
        }
    },
    
})












