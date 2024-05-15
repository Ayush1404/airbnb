import prisma from '@/app/libs/prismadb'

export type IListingParams ={
    userId? : string
}
export default async function getListings (params:IListingParams) {
    try{

        const {userId} = params

        const query:any ={}

        if(userId){
            query.userId =userId
        }

        const listings = await prisma.listing.findMany({
            where:query,
            orderBy :{
                createdAt:'desc'
            }
        })
        return listings
    }catch(err:any)
    {
       console.log(err)
    }
} 