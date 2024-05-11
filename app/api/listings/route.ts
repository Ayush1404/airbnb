import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
export async function POST(req:Request){
    try{
        const currentUser = await getCurrentUser()

        if(!currentUser) return NextResponse.error()

        const body = await req.json()

        const { 
            title,
            description,
            imageSrc,
            roomCount,
            category,
            bathroomCount,
            guestCount,
            price,
            location
        } = body

        Object.keys(body).forEach((value)=>{
            if(!body[value]){
                return NextResponse.error()
            }
        })
        const listing = await prisma.listing.create({
            data:{
                title,
                description,
                imageSrc,
                roomCount,
                category,
                bathroomCount,
                guestCount,
                price:parseInt(price,10),
                locationValue:location.value,
                userId:currentUser.id
            }
        })
        return NextResponse.json(listing)
    }catch(err)
    {
        console.log(err)
    }
}