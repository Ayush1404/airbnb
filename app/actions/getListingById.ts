import prisma from '@/app/libs/prismadb'

type IParams = {
    listingId : string
}

export default async function getListingById(params:IParams) {
    try {
        const listing = await prisma.listing.findUnique({
            where:{
                id:params.listingId
            },
            include:{
                user:true
            }
        })
        if(!listing) return null;
        return listing;
    }catch(err:any)
    {
        console.log(err)
        return null;
    }
}