import prisma from '@/app/libs/prismadb'
import { getCurrentUser } from './getCurrentUser'


export default async function getFavoriteListings(){
    try{
        const currentUser = await getCurrentUser()

        const favoriteLitings = await prisma.listing.findMany({
            where:{
                id:{
                    in :[...(currentUser?.favoriteIDs || [])]
                }
            }
        })

        return favoriteLitings;
    }catch(err)
    {
        console.log(err)
    }
}