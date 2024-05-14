'use client'
import Container from '@/app/components/Container'
import { useLoginModal } from '@/app/components/hooks/userLoginModal'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import ListingReservation from '@/app/components/listings/ListingReservation'
import { categories } from '@/app/constants'
import { SafeUser } from '@/app/types'
import { Listing, Reservation, User } from '@prisma/client'
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval, setDate } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { toast } from 'react-toastify'

const initialDateRange ={
    startDate : new Date(),
    endDate : new Date(),
    key : 'selection'
}
type ListingClientProps = {
    listing: Listing & {user : User}
    currentUser?:SafeUser|null,
    reservations?:(Reservation & {listing:Listing})[] 
}
const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations=[]
}) => {
    const loginModal = useLoginModal()
    const router = useRouter()
    const disableDates = useMemo(()=>{
        let dates : Date[] = []

        reservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start : new Date(reservation.startDate),
                end : new Date(reservation.endDate)
            })
            dates =[...dates,...range]
        })

        return dates
    },[reservations])

    const [isLoading,setIsLoading] = useState(false)
    const [totalPrice , setToatalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(()=>{
        if(!currentUser) return loginModal.onOpen()
        setIsLoading(true)
        axios.post('/api/reservations',{
            totalPrice,
            startDate : dateRange.startDate ,
            endDate : dateRange.endDate,
            listingId:listing?.id
        }).then(()=>{
            toast.success('Reservation created !')
            setDateRange(initialDateRange)
            router.refresh()
        }).catch((err)=>{
            toast.error("Error occured while creating reservation")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[currentUser,totalPrice,dateRange,listing?.id,router])

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate)
        {
            const dayCount = differenceInCalendarDays(
                dateRange.startDate,
                dateRange.endDate
            )   
            if(dayCount && listing.price)
            {
                setToatalPrice(dayCount * listing.price * (-1))
            }
            else
            {
                setToatalPrice(listing.price)
            }
        }
    },[dateRange,listing])
    const category = useMemo(()=>{
        return categories.find((item)=>item.label===listing.category)
    },[listing.category])
    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className='order-first mb-10 md:order:last md:col-span-3'>
                            <ListingReservation 
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate = {(value) => setDateRange(value)}
                                dateRange = {dateRange}
                                onSubmit = {onCreateReservation}
                                disabled = {isLoading}
                                disableDates = {disableDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient