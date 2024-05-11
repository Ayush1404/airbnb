import { SafeUser } from '@/app/types'
import React from 'react'

type ListingHeadProps ={
    title:string
    imagesrc:string
    locationValue:string
    id:string
    currentUser?:SafeUser|null
}
const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    currentUser,
    imagesrc,
    locationValue,
    id
}) => {
  return (
    <div>ListingHead</div>
  )
}

export default ListingHead