import React, { Suspense } from 'react'
import { getCurrentUser } from '../actions/getCurrentUser'
import EmptyState from '../components/EmptyState'
import getListings from '../actions/getListings'
import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser ){
        return (
            <EmptyState 
                title='Unautharized'
                subtitle='Please login.'
            />
        )
    }
    const listings = await getListings({
        userId : currentUser.id
    })

    if(!listings || listings.length === 0 ) return(
        <EmptyState 
            title='No properties found'
            subtitle='Looks like you have no properties registered'
        />
    )
    return (
        <Suspense>
             <PropertiesClient
                listings = {listings}
                currentUser = {currentUser}
            />
        </Suspense>
  )
}

export default PropertiesPage