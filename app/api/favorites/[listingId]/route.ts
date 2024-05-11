import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismadb'

type IParams = {
    listingId:string
}

export async function POST ( request:Request , {params}:{params:IParams}) {
    const currentUser = await getCurrentUser()
    if(!currentUser) return NextResponse.error()
    const {listingId} = params
    if(!listingId || typeof(listingId)!=='string') throw new Error('Invalid Id')

    let favoriteIDs = [ ...(currentUser.favoriteIDs || []) ]

    favoriteIDs.push(listingId)

    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIDs
        }
    })

    return NextResponse.json(user)
}

export async function DELETE( request:Request , {params}:{params:IParams}) {
    const currentUser = await getCurrentUser()
    if(!currentUser) return NextResponse.error()
    const {listingId} = params
    if(!listingId || typeof(listingId)!=='string') throw new Error('Invalid Id')

    let favoriteIDs = [ ...(currentUser.favoriteIDs || []) ]

    favoriteIDs = favoriteIDs.filter((id)=>id!==listingId)

    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIDs
        }
    })

    return NextResponse.json(user)
}