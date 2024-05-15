'use client'
import { Listing } from '@prisma/client'
import React, { useCallback, useState } from 'react'
import { SafeUser } from '../types'
import Heading from '../components/Heading'
import Container from '../components/Container'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import ListingCard from '../components/listings/ListingCard'

type PropertiesClientProps ={
    listings : Listing[]
    currentUser : SafeUser
}
const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`).then(()=>{
            toast.success("Listing deleted")
            router.refresh()
        }).catch((err)=>{
            toast.error(err?.responce?.data?.error)
        }).finally(()=>{
            setDeletingId('')
        })
    },[router])
    return (
        <Container>
            <Heading
                title='Properties'
                subtitle="List of your properties"
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {listings.map((listing)=>(
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        currentUser={currentUser}
                        actionId={listing.id}
                        onAction={onCancel}
                        actionLabel='Delete property'
                        disabled={deletingId===listing.id}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient