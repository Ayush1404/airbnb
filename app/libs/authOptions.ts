import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from '@/app/libs/prismadb'
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export const authOptions : AuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        Github({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string 
        }),
        Credentials({
            name: ' credentials' , 
            credentials :{
                email : { label : "Email" , type : 'text'} ,
                password : { label : "Password" , type : 'password'} ,
            },
            async authorize(credentials){
                if( !credentials?.email || !credentials?.password) throw new Error('Invalid Credentials.')

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if ( !user || !user?.hashedPassword ) throw new Error('Invalid credentials.')

                const isCorrecrPassword = await bcrypt.compare(credentials.password,user.hashedPassword) 

                if(!isCorrecrPassword) throw new Error('Incorrect Password')

                return user
            }
        })
    ],
    pages : {
        signIn : '/'
    },
    session :{
        strategy : 'jwt'
    },
    secret : process.env.NEXTAUTH_SECRET,
}
