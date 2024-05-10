import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
export async function POST(request:Request)
{
    try{
        const { email , name , password } = await request.json()
    
        const hashedPassword = await bcrypt.hash( password , 12 )

        const user = await prisma.user.create({
            data:{
                email,
                name,
                hashedPassword
            }
        })
        return NextResponse.json(
            {
                user,
                success:true
            }
        )
    }catch(err)
    {
        console.log(err)
        return NextResponse.json(
            {
                success:false,
                message:"Error while registering user"
            },
            {
                status:500
            }
        )
    }

    
}