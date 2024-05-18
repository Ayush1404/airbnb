'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "../libs/authOptions" 
import prisma from '@/app/libs/prismadb'

export async function getSession(){
    return await getServerSession(authOptions)
}

export async function getCurrentUser(){
    try{
        const session = await getSession();
        
        if(!session?.user?.email) return null;

        const currentUser = await prisma.user.findUnique({
            where:{
                email:session.user.email as string
            }
        })

        if(!currentUser) return null;

        return {
            ...currentUser,
            createdAt:currentUser.createdAt.toISOString(),
            updatedAt:currentUser.createdAt.toISOString(),
            emailVerified : currentUser.emailVerified?.toISOString() || null
        }

    }catch(err){
        return null;
    }
    
}
