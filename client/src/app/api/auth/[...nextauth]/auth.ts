
import axios from "axios";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
// import NextAuth from "next-auth";

//custom user

// Update your CustomUser type to include the id property, which is required by the User type and required for NextAuth.


export type CustomUser = {
    id?: string | null,
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
    expires: ISODateString
}

//auth options:- 

export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type:"credentials",
            credentials: {
                email: { label: "Email", type:"email", placeholder:"Enter your email"},
                password: { label:"Password", type:"password"}
            },
            async authorize( credentials ){

                // console.log("credentials:-----------------",credentials);
                if (!credentials || !credentials.email || !credentials.password) {
                    // throw new Error("Email and password are required");.
                    return null;
                }

                try{
       
                const { data} = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`,
                    credentials,
                    { headers:{ "Content-Type":"application/json"}}
                )

                const user = data.data as CustomUser;
                
                // Update your CustomUser type to include the id property, which is required by the User type and required for NextAuth.
                if(user && user.userId){
                    return { ...user, id: user.userId};
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
        async session({ token, session}:{ token: JWT, session: CustomSession}){
            session.user = token.user as CustomUser;
            return session;
        }
    },
    
};












