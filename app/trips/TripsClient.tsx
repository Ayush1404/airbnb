'use client'
import { Listing, Reservation } from '@prisma/client'
import React, { useCallback, useState } from 'react'
import { SafeUser } from '../types'
import Heading from '../components/Heading'
import Container from '../components/Container'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import ListingCard from '../components/listings/ListingCard'

type TripsClientProps ={
    reservations : (Reservation & {listing:Listing})[]
    currentUser : SafeUser
}
const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`).then(()=>{
            toast.success("reservation canceled")
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
                title='My trips'
                subtitle="Where you have been and where you're going"
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {reservations.map((reservation)=>(
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId===reservation.id}
                        actionLabel='Cancel Reservation'
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient