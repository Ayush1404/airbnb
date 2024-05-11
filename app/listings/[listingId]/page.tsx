import { getCurrentUser } from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState'

import React from 'react'
import ListingClient from './ListingClient'

type IParams = {
    listingId : string
}

const ListingPage = async ({params}:{params:IParams}) => {
   
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()

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
            />
        </div>
    )
}

export default ListingPage