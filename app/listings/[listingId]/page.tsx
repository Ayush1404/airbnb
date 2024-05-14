
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState'

import React from 'react'
import ListingClient from './ListingClient'
import getReservations from '@/app/actions/getReservations'

type IParams = {
    listingId : string
}

const ListingPage = async ({params}:{params:IParams}) => {
   
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)
    if(!listing) return (
        <div>
            <EmptyState 
                title='Listing doesnt exist'
                subtitle='Listing not found'
            />
        </div>
    )
    return (
        <div>
            <ListingClient 
                listing={listing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </div>
    )
}

export default ListingPage