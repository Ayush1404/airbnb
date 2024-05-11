import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import { categories } from '@/app/constants'
import { SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import React, { useMemo } from 'react'

type ListingClientProps = {
    listing: Listing 
    currentUser?:SafeUser|null,
    reservations?:Reservation[]
}
const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations
}) => {
    const category = useMemo(()=>{
        return categories.find((item)=>item.label===listing.category)
    },[listing.category])
    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead 
                        title={listing.title}
                        imagesrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ListingClient